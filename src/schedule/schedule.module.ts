import { ScheduleService } from './schedule.service';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { RateModule } from 'src/rate/rate.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [SubscriptionModule, EmailModule, RateModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
