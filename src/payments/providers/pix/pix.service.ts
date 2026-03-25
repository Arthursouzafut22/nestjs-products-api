import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePixPaymentDto } from 'src/payments/dto/create-pix-payment-dto';

@Injectable()
export class PixService {
  private token: string;
  private url: string;
  constructor(private readonly config: ConfigService) {
    this.token = this.config.get<string>('ASAAS_TOKEN') as string;
    this.url = this.config.get<string>('URL_PIX_QRCODE') as string;
  }

  async generateQrCode(payload: CreatePixPaymentDto) {
    if (payload.value < 0 || payload.value === 0) {
      throw new BadRequestException('Valor inválido');
    }

    if (payload.description.length > 90) {
      throw new BadRequestException('Descrição muito longa');
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: this.token,
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    return json;
  }
}
