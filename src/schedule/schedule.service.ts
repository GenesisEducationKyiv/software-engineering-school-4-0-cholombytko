import { IScheduleService } from './interfaces/schedule-service.interface';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IMailingService } from 'src/email/interfaces/mailing-service.interface';
import { IRateService } from 'src/rate/interfaces/rate-service.interface';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    private readonly mailingService: IMailingService,
    private readonly rateService: IRateService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async scheduleEveryDayTask(): Promise<void> {
    const payload = await this.rateService.getExchangeRate();
    await this.mailingService.sendMailsToSubscribers(payload);
  }
}
