import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersControllers } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [UsersControllers, AuthController],
  providers: [UsersService, AuthService, JwtService],
})
export class AppModule {}
