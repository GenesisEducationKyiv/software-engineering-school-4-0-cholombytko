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
  ) {}

  async subscribe(payload: ISubscribe): Promise<void> {
    this.logger.log(payload);
    this.subscriptionClient.emit('add-subscriber', payload);
  }

  async getRate(): Promise<IRate> {
    const result = await firstValueFrom(
      this.rateClient.send({ cmd: 'get_rate' }, {}),
    );
    return result;
  }
}
