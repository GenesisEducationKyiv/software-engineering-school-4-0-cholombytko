import { ICreateSubscription } from './interfaces/create-subscription.interface';
import { ISendToSubscribers } from './interfaces/send-to-subscribers.interface';
import { ISubscribeResult } from './interfaces/subscribe-response.interface';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/services/email.service';
import { MailingService } from 'src/email/services/mailing.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly emailService: EmailService,
    private readonly mailingService: MailingService,
  ) {}

  public async createSubscription(
    payload: ICreateSubscription,
  ): Promise<ISubscribeResult> {
    await this.emailService.create(payload.email);
    return { message: 'E-mail successfully subscribed' };
  }

  public async sendMailToSubscribers(
    payload: ISendToSubscribers,
  ): Promise<void> {
    const subscribers = await this.emailService.findAll(true);
    const mailPromises = subscribers.map((subscriber) =>
      this.mailingService.sendMail({
        html: payload.html,
        subject: payload.subject,
        to: subscriber.email,
      }),
    );

    await Promise.all(mailPromises);
  }
}
