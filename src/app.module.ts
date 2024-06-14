import { DatabaseModule } from './database.module';
import { EmailModule } from './email/email.module';
import { MailModule } from './mail.module';
import { RateModule } from './rate/rate.module';
import { ScheduleModule as ScheduleMailModule } from './schedule/schedule.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    RateModule,
    EmailModule,
    SubscriptionModule,
    DatabaseModule,
    MailModule,
    ScheduleMailModule,
  ],
})
export class AppModule {}
