import { ISendMail } from './send-mail.interface';

export interface IMailingService {
  sendMail(payload: ISendMail): Promise<void>;
  sendMailsToSubscribers(): Promise<void>;
}
