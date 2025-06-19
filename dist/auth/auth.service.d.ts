import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto } from './DTO/login.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './DTO/UserInterface';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    loginUser(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    registerUser(registerDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshTokens(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    generateTokens(user: UserInterface): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private updateRefreshToken;
    validateUser(email: string, password: string): Promise<UserInterface | null>;
    login(user: UserInterface): Promise<string>;
    private findUserByEmail;
    hashPassword(password: string): Promise<string>;
}
