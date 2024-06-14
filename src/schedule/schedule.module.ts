import { ScheduleService } from './schedule.service';
import { Module } from '@nestjs/common';
import { RateModule } from 'src/rate/rate.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [SubscriptionModule, RateModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
