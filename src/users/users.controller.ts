import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/dto-user';

@Controller('users')
export class UsersControllers {
  constructor(private readonly user: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    return this.user.create(user);
  }
}
