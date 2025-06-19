"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_2 = require("typeorm");
const shared_1 = require("../shared");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async loginUser(loginDto, res) {
        try {
            const user = await this.validateUser(loginDto.email, loginDto.password);
            if (!user) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            const tokens = await this.generateTokens(user);
            if (!tokens) {
                throw new common_1.HttpException('Login failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            res.cookie(shared_1.ACCESS_TOKEN_NAME, tokens.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000,
            });
            res.cookie(shared_1.REFRESH_TOKEN_NAME, tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(201).json({
                message: 'Logged in successfully',
                user: {
                    id: user.id,
                    email: user.email,
                }
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Login failed', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async registerUser(registerDto, res) {
        const { username: rawUsername, name: rawName, email: rawEmail, password, position, avatarUrl } = registerDto;
        const email = rawEmail.toLowerCase().trim();
        const username = rawUsername.trim();
        const name = rawName.trim();
        try {
            const existingUser = await this.userRepository.findOne({
                where: [{ email }, { username }],
            });
            if (existingUser) {
                throw new common_1.HttpException('Email or Username already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await this.hashPassword(password);
            if (!hashedPassword) {
                throw new common_1.HttpException('Password hashing failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const newUser = this.userRepository.create({
                username,
                name,
                email,
                password: hashedPassword,
                position,
                avatarUrl,
            });
            await this.userRepository.save(newUser);
            const tokens = await this.generateTokens(newUser);
            if (!tokens) {
                throw new common_1.HttpException('Registration failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.updateRefreshToken(newUser.id, tokens.refreshToken);
            res.cookie(shared_1.ACCESS_TOKEN_NAME, tokens.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000,
            });
            res.cookie(shared_1.REFRESH_TOKEN_NAME, tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(201).json({
                message: 'Registered successfully',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Registration failed', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refreshTokens(req, res) {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                throw new common_1.HttpException('Refresh token not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.userRepository.findOne({
                where: { id: decoded.sub, refreshToken: refreshToken }
            });
            if (!user) {
                throw new common_1.HttpException('Invalid refresh token', common_1.HttpStatus.UNAUTHORIZED);
            }
            const tokens = await this.generateTokens(user);
            if (!tokens) {
                throw new common_1.HttpException('Token generation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            res.cookie(shared_1.ACCESS_TOKEN_NAME, tokens.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000,
            });
            res.cookie(shared_1.REFRESH_TOKEN_NAME, tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                message: 'Tokens refreshed successfully',
                user: {
                    id: user.id,
                    email: user.email,
                }
            });
        }
        catch (error) {
            throw new common_1.HttpException('Invalid refresh token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async generateTokens(user) {
        const payload = {
            email: user.email,
            sub: user.id,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        await this.userRepository.update(userId, { refreshToken });
    }
    async validateUser(email, password) {
        const user = await this.findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
        };
        return this.jwtService.sign(payload);
    }
    async findUserByEmail(email) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();
        return user ? user : null;
    }
    async hashPassword(password) {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map