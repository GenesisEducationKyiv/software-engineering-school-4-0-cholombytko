import { ICreateSubscription } from './create-subscription.interface';
import { Email } from 'src/entities/email.entity';

export interface ISubscriptionService {
  createSubscription(payload: ICreateSubscription): Promise<Email>;
  findAllSubscribers(): Promise<Email[]>;
}
