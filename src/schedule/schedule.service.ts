import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RateService } from 'src/rate/rate.service';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly rateService: RateService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async sendEmails(): Promise<void> {
    const { currencyCode, date, rate } =
      await this.rateService.getExchangeRate();

    const mailMessage = this.mailHtmlTemplate(currencyCode, rate, date);
    const mailSubject = 'Exchange rate USD to UAH';

    await this.subscriptionService.sendMailToSubscribers({
      html: mailMessage,
      subject: mailSubject,
    });
  }

  private mailHtmlTemplate(
    currencyCode: string,
    rate: number,
    date: string,
  ): string {
    return `<p>Current rate ${currencyCode} to UAH - ${rate}. Date: ${date}</p>`;
  }
}
