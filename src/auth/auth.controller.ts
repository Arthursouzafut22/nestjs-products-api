import { Body, Controller, Post } from '@nestjs/common';

@Controller('login')
export class AuthController {
  constructor() {}
  @Post()
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return { email, password };
  }
}
