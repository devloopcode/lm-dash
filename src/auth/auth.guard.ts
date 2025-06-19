
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_NAME } from 'src/shared';

interface JwtPayload {
    sub: number;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const req: Request = context.switchToHttp().getRequest();
        const token = req.cookies[ACCESS_TOKEN_NAME];


        if (!token) throw new UnauthorizedException('Token not found');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);

            if (typeof decoded !== 'object' || decoded === null) {
                throw new UnauthorizedException('Invalid token payload');
            }

            // req.user = decoded as AuthenticatedRequest;
            req['user'] = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        // try {
        //     // const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        //     const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        //     req.user = payload;
        //     return true;
        // } catch (err) {
        //     throw new UnauthorizedException('Invalid token');
        // }
    }
}
