import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
import { ProductsDto } from './dto/dto-products';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Service para retorna todos produtos
  async getProducts(): Promise<ProductsDto[]> {
    const products = await this.prisma.products.findMany({
      include: {
        variations: {
          include: {
            images: true,
          },
        },
      },
    });

    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        storage: product.storage,
        colors: product.colors,
        category: product.category,
        description: product.description,
        createdAt: product.createdAt,
        variations: product.variations.map((variation) => ({
          id: variation.id,
          key: variation.key,
          productId: variation.productId,
          images: variation.images.map((img) => img.url),
        })),
      };
    });
  }

  async getProductById(id: number): Promise<ProductsDto> {
    if (id <= 0) {
      throw new BadRequestException('ID não existe');
    }
    const product = await this.prisma.products.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  // Service para filtra produtos pela url
  async findByCategory(category: string) {
    const productsByCategory = await this.prisma.products.findMany({
      where: { category: category },
      include: {
        variations: {
          include: { images: true },
        },
      },
    });

    if (productsByCategory.length === 0) {
      return {
        message: 'Nenhum produto encontrado para a categoria informada',
      };
    }

    return productsByCategory;
  }

  // Paginação de produtos...
  async findAllPagination(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const skip = (Number(page) - 1) * Number(limit);

    const [product, total] = await Promise.all([
      this.prisma.products.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.products.count(),
    ]);

    return {
      data: product,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / Number(limit)),
      },
    };
  }
}