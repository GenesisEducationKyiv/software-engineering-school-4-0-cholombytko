import { ISendMail } from './send-mail.interface';
import { IRate } from './rate.interface';

export interface IEmailSender {
  sendMail(payload: ISendMail): Promise<void>;
  sendMailsToSubscribers(subscribers, payload: IRate): Promise<void>;
}
