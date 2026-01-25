import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  exports: [],
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
})
export class ProductsModule {}
