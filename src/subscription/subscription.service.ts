import { ICreateSubscription } from './interfaces/create-subscription.interface';
import { ISubscribeResult } from './interfaces/subscribe-response.interface';
import { Injectable } from '@nestjs/common';
import { IEmailService } from 'src/email/interfaces/email-service.interface';

@Injectable()
export class SubscriptionService {
  constructor(private readonly emailService: IEmailService) {}

  public async createSubscription(
    payload: ICreateSubscription,
  ): Promise<ISubscribeResult> {
    await this.emailService.create(payload.email);
    return { message: 'E-mail successfully subscribed' };
  }
}
