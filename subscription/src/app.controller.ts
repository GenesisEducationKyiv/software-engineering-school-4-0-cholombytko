import { SUBCRIPTION_TOKEN } from './app.constants';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(SUBCRIPTION_TOKEN)
    private readonly subscriptionService: ISubscriptionService,
  ) {}

  @MessagePattern({ cmd: 'add_subscriber' }, Transport.RMQ)
  async handleSubscribe(@Payload() data: CreateSubscriptionDto) {
    return await this.subscriptionService.createSubscription(data);
  }
}
