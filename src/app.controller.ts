import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('/live')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // export class TestController {
  @Get('live')
  getLive() {
    return { status: 'ok' };
  }
}
