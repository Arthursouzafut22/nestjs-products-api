import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/dto-user';

@Controller('users')
export class UsersControllers {
  constructor(private readonly user: UsersService) {}

  @HttpCode(201)
  @Post()
  create(@Body() user: UserDto) {
    return this.user.create(user);
  }
}
