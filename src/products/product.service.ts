import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
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
}
