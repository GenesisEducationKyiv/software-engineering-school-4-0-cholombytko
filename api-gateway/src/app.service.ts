import { ISubscribe } from './interfaces/subscribe.interface';
import { IUnsubscribe } from './interfaces/unsubscribe.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger();

  constructor(
    @Inject('SUBSCRIPTION_SERVICE') private subscriptionClient: ClientProxy,
  ) {}

  async subscribe(data: ISubscribe): Promise<void> {
    this.logger.log(data);
    const response = this.subscriptionClient.send(
      { cmd: 'add_subscriber' },
      data,
    );
    this.logger.log(response);
  }

  async unsubscribe(data: IUnsubscribe): Promise<void> {
    this.logger.log(data);
    this.subscriptionClient.emit('unsubscribe', data);
  }

  async getRate(): Promise<void> {

  }
}
