import { MailSendingException } from '../exceptions/mail-sending.exception';
import { ISendMail } from '../interfaces/send-mail.interface';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
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
}
