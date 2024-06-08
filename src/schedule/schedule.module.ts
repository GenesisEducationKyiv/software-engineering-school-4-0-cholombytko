import { ScheduleService } from './schedule.service';
import { Module } from '@nestjs/common';
import { RateModule } from 'src/rate/rate.module';
import { SubscribeModule } from 'src/subscribe/subscribe.module';

@Module({
  imports: [SubscribeModule, RateModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
