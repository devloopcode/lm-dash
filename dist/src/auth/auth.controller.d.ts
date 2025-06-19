import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto } from './DTO/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    checkStatus(req: any): {
        authenticated: boolean;
        user: any;
    };
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    register(registerDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
