import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly user: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.user.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) idUser: number, @Headers('authorization') token: string ): Promise<AuthEntity> {
    return this.user.getUser(idUser, token);
  }
}
