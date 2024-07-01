import { IScheduleService } from './interfaces/schedule-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MAILING_SERVICE_TOKEN } from 'src/email/email.tokens';
import { IMailingService } from 'src/email/interfaces/mailing-service.interface';
import { IRateService } from 'src/rate/interfaces/rate-service.interface';
import { RATE_SERVICE_TOKEN } from 'src/rate/rate.constants';

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @Inject(MAILING_SERVICE_TOKEN)
    private readonly mailingService: IMailingService,
    @Inject(RATE_SERVICE_TOKEN)
    private readonly rateService: IRateService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async scheduleEveryDayTask(): Promise<void> {
    const payload = await this.rateService.getExchangeRate();
    await this.mailingService.sendMailsToSubscribers(payload);
  }
}
