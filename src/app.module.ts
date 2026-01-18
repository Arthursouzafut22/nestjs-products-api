import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersControllers } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [UsersControllers],
  providers: [UsersService],
})
export class AppModule {}
