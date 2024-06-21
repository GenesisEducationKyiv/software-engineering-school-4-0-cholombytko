import { ISendMail } from './send-mail.interface';
import { IRate } from 'src/rate/interfaces/rate.interface';

export interface IMailingService {
  sendMail(payload: ISendMail): Promise<void>;
  sendMailsToSubscribers(payload: IRate): Promise<void>;
}
