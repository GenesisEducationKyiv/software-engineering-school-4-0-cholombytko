import { SUBCRIPTION_TOKEN } from './app.constants';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(SUBCRIPTION_TOKEN)
    private readonly subscriptionService: ISubscriptionService,
  ) {}

  @EventPattern('add-subscriber')
  async handleSubscribe(@Payload() payload: CreateSubscriptionDto) {
    await this.subscriptionService.createSubscription(payload);
  }
}
