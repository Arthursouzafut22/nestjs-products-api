import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

// @UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly user: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.user.signIn(email, password);
  }

  @Get(":id")
  getUser(@Param("id") id: number){
    return this.user.getUser(id)

  }
}
