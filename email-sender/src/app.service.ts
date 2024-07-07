import { IRate } from './interfaces/rate.interface';
import { MailSendingException } from './exceptions/mail-sending.exception';
import { IEmailSender } from './interfaces/email-sender.interface';
import { ISendMail } from './interfaces/send-mail.interface';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService implements IEmailSender {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(payload: ISendMail): Promise<void> {
    try {
      await this.mailerService.sendMail({
        html: payload.html,
        subject: payload.subject,
        to: payload.to,
      });
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new MailSendingException();
    }
  }

  public async sendMailsToSubscribers(
    subscribers: any,
    payload: IRate,
  ): Promise<void> {
    const { currencyCode, date, rate } = payload;

    const mailMessage = this.mailHtmlTemplate(currencyCode, rate, date);
    const mailSubject = 'Exchange rate USD to UAH';

    const mailPromises = subscribers.map((subscriber) =>
      this.sendMail({
        html: mailMessage,
        subject: mailSubject,
        to: subscriber.email,
      }),
    );

    await Promise.allSettled(mailPromises);
  }

  private mailHtmlTemplate(
    currencyCode: string,
    rate: number,
    date: string,
  ): string {
    return `<p>Current rate ${currencyCode} to UAH - ${rate}. Date: ${date}</p>`;
  }
}
