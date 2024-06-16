import { Email } from '../entities/email.entity';

export interface IEmailService {
  create(email: string): Promise<Email>;
  findAll(isSubscribed: boolean): Promise<Email[]>;
}
