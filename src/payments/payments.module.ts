import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PixService } from './providers/pix/pix.service';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [PaymentService, PixService],
})
export class PaymentsModule {}
