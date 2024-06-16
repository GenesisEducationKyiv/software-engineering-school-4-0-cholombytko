import { IScheduleService } from './interfaces/schedule-service.interface';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IMailingService } from 'src/email/interfaces/mailing-service.interface';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(private readonly mailingService: IMailingService) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async scheduleEveryDayTask(): Promise<void> {
    await this.mailingService.sendMailsToSubscribers();
  }
}
