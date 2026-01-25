import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersControllers } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProductsController } from './products/products.controller';
import { ProductService } from './products/product.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [UsersControllers, AuthController, ProductsController],
  providers: [UsersService, AuthService, ProductService, JwtService],
})
export class AppModule {}
