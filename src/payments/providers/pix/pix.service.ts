import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    if (!payload?.value || payload.value <= 0) {
      throw new BadRequestException('Valor deve ser maior que 0');
    }

    if (payload?.description && payload.description.length > 90) {
      throw new BadRequestException('Descrição deve ter no máximo 90 caracteres');
    }

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          access_token: this.token,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new BadRequestException(data?.message || 'Erro ao gerar QR Code Pix');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao comunicar com o serviço de pagamento');
    }
  }
}
