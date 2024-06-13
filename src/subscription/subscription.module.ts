import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [SubscriptionController],
  exports: [SubscriptionService],
  imports: [EmailModule],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
