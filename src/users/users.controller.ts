import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/dto-user';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersControllers {
  constructor(private readonly user: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    return this.user.create(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getUser(@Headers('authorization') authHeader: string) {
    return this.user.getUser(authHeader);
  }
}
