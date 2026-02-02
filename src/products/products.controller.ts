import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsDto } from './dto-products';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductsDto[]> {
    return this.productService.getProducts();
  }

  @Get('/category')
  findByCategory(@Query('category') category: string) {
    return this.productService.findByCategory(category);
  }
}
