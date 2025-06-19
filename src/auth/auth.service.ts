import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto } from './DTO/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './DTO/UserInterface';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from 'src/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async loginUser(loginDto: LoginDto, res: Response) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);

      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const tokens = await this.generateTokens(user);

      if (!tokens) {
        throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }



      // Store refresh token in user record
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      // Set tokens as httpOnly cookies
      res.cookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie(REFRESH_TOKEN_NAME, tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        message: 'Logged in successfully',
        user: {
          id: user.id,
          email: user.email,
        }
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerUser(registerDto: CreateUserDto, res: Response) {
    const { username: rawUsername, name: rawName, email: rawEmail, password, position, avatarUrl } = registerDto;

    const email = rawEmail.toLowerCase().trim();
    const username = rawUsername.trim();
    const name = rawName.trim();

    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ email }, { username }],
      });

      if (existingUser) {
        throw new HttpException('Email or Username already exists', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await this.hashPassword(password);

      if (!hashedPassword) {
        throw new HttpException('Password hashing failed', HttpStatus.INTERNAL_SERVER_ERROR);
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
        throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Store refresh token in user record
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);

      // Set tokens as httpOnly cookies
      res.cookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie(REFRESH_TOKEN_NAME, tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(201).json({
        message: 'Registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshTokens(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new HttpException('Refresh token not found', HttpStatus.UNAUTHORIZED);
      }
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Find user and verify refresh token matches
      const user = await this.userRepository.findOne({
        where: { id: decoded.sub, refreshToken: refreshToken }
      });

      if (!user) {
        throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);


      if (!tokens) {
        throw new HttpException('Token generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Update refresh token in database
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      // Set new tokens as cookies
      res.cookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie(REFRESH_TOKEN_NAME, tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        message: 'Tokens refreshed successfully',
        user: {
          id: user.id,
          email: user.email,
        }
      });
    } catch (error) {
      throw new HttpException(
        'Invalid refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async generateTokens(user: UserInterface) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m', // 15 minutes
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d', // 7 days
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async validateUser(email: string, password: string): Promise<UserInterface | null> {
    const user = await this.findUserByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: UserInterface) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  private async findUserByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();
    return user ? user : null;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}