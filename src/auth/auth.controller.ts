import { Controller, Post, Req, Res, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto } from './DTO/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';
// import { AuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  checkStatus(@Req() req) {
    return { authenticated: true, user: req.user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return await this.authService.loginUser(loginDto, res);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto, @Res() res: Response) {
    return await this.authService.registerUser(registerDto, res);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshTokens(req, res);
  }
}