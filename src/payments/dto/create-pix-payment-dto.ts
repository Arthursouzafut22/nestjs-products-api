import { IsNumber, IsOptional, MaxLength, Min } from 'class-validator';

enum FormatPix {
  IMAGE,
  ALL,
  PAYLOAD,
}

export class CreatePixPaymentDto {
  addressKey: string;

  @IsOptional()
  @MaxLength(90)
  description: string;

  @IsNumber()
  @Min(0.01)
  value: number;

  format?: FormatPix;
  expirationDate: Date;
}
