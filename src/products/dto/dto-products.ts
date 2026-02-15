import { Decimal } from "@prisma/client/runtime/index-browser";

export class ProductsDto {
  id: number;
  name: string;
  price: Decimal;
  storage: string[];
  colors: string[];
  category: string;
  description: string;
  createdAt: Date;
  variations?: {
    id: number;
    key: string;
    productId: number;
    images: string[];
  }[];
}
