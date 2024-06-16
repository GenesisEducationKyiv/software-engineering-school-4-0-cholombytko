import { ICreateSubscription } from './create-subscription.interface';
import { ISubscribeResult } from './subscribe-response.interface';

export interface ISubscriptionService {
  createSubscription(payload: ICreateSubscription): Promise<ISubscribeResult>;
}
