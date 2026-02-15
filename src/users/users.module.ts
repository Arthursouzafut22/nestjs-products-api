import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllers } from './users.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UsersControllers],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
