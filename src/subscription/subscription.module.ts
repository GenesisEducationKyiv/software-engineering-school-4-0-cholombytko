import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SUBSCRIPTION_SERVICE_TOKEN } from './subscription.tokens';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [SubscriptionController],
  exports: [SUBSCRIPTION_SERVICE_TOKEN],
  imports: [EmailModule],
  providers: [
    {
      provide: SUBSCRIPTION_SERVICE_TOKEN,
      useClass: SubscriptionService,
    },
  ],
})
export class SubscriptionModule {}
