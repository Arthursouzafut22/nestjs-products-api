import { Body, Controller, Post } from '@nestjs/common';
import { CreatePixPaymentDto } from './dto/create-pix-payment-dto';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post('pix/qrcode')
  generatePixQrCode(@Body() payload: CreatePixPaymentDto) {
    return this.paymentsService.generateQrCode(payload);
  }

  @Post('checkout/credit-card')
  checkoutCreditCard(payload: any) {}
}
