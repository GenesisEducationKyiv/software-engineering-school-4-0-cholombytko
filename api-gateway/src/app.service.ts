import { IRate } from './interfaces/rate.interface';
import { ISubscribe } from './interfaces/subscribe.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private logger = new Logger();

  constructor(
    @Inject('SUBSCRIPTION_SERVICE') private subscriptionClient: ClientProxy,
    @Inject('RATE_SERVICE') private rateClient: ClientProxy,
    @Inject('EMAILS_SERVICE') private emailsClient: ClientProxy,
  ) {}

  async subscribe(data: ISubscribe): Promise<void> {
    this.logger.log(data);
    const result = await firstValueFrom(
      this.subscriptionClient.send(
        { cmd: 'add_subscriber' },
        JSON.stringify({ data }),
      ),
    );
    this.logger.log(result);
    return result;
  }

  async getSubscribers(): Promise<[]> {
    const result = await firstValueFrom(
      this.subscriptionClient.send({ cmd: 'get_all_subscribers' }, {}),
    );
    return result;
  }

  async getRate(): Promise<IRate> {
    const result = await firstValueFrom(
      this.rateClient.send({ cmd: 'get_rate' }, {}),
    );
    return result;
  }

  async sendEmails() {
    const rate = await this.getRate();
    const subscribers = await this.getSubscribers();
    const data = { rate, subscribers };
    const result = await firstValueFrom(
      this.emailsClient.send({ cmd: 'send_emails' }, JSON.stringify(data)),
    );
    return result;
  }
}
