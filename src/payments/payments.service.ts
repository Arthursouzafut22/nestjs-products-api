import { Injectable } from '@nestjs/common';
import { CreatePixPaymentDto } from './dto/create-pix-payment-dto';
import { PixService } from './providers/pix/pix.service';

@Injectable()
export class PaymentService {
  constructor(private readonly pixService: PixService) {}

  async generateQrCode(payload: CreatePixPaymentDto) {
    return this.pixService.generateQrCode(payload);
  }
}
