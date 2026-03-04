import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsDto } from './dto/dto-products';
import { PaginationDto } from './dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductsDto[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseIntPipe()) id: number): Promise<ProductsDto> {
    return this.productService.getProductById(id);
  }

  @Get('category')
  findByCategory(@Query('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get()
  findAllPagination(@Query() paginationDto: PaginationDto) {
    return this.productService.findAllPagination(paginationDto);
  }
}
