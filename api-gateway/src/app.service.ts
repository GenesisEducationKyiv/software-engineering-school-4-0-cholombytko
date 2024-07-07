import { ISubscribe } from './interfaces/subscribe.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger();

  constructor(
    @Inject('SUBSCRIPTION_SERVICE') private subscriptionClient: ClientProxy,
  ) {}

  async subscribe(payload: ISubscribe): Promise<void> {
    this.logger.log(payload);
    this.subscriptionClient.emit('add-subscriber', payload);
  }
}
