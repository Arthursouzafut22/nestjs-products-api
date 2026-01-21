import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly user: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.user.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') idUser: number, @Headers('authorization') token: string) {
    return this.user.getUser(idUser, token);
  }
}
