import { Module } from '@nestjs/common';
import { SubscribeModule } from 'src/subscribe/subscribe.module';
import { RateModule } from 'src/rate/rate.module';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [SubscribeModule, RateModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
