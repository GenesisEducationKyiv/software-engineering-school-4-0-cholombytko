import { IRate } from '../../../src/rate/interfaces/rate.interface';
import { EMAIL_SERVICE_TOKEN } from '../email.tokens';
import { MailSendingException } from '../exceptions/mail-sending.exception';
import { IEmailService } from '../interfaces/email-service.interface';
import { IMailingService } from '../interfaces/mailing-service.interface';
import { ISendMail } from '../interfaces/send-mail.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService implements IMailingService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(EMAIL_SERVICE_TOKEN) private readonly emailService: IEmailService,
  ) {}

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

  public async sendMailsToSubscribers(payload: IRate): Promise<void> {
    const { currencyCode, date, rate } = payload;

    const mailMessage = this.mailHtmlTemplate(currencyCode, rate, date);
    const mailSubject = 'Exchange rate USD to UAH';

    const subscribers = await this.emailService.findAll(true);
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
