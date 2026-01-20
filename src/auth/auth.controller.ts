import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly user: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.user.signIn(email, password);
  }
}
