enum FormatPix {
  IMAGE,
  ALL,
  PAYLOAD,
}

export class CreatePixPaymentDto {
  addressKey: string;
  description: string;
  value: number;
  format?: FormatPix;
  expirationDate: Date;
}
