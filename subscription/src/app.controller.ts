import { SUBCRIPTION_TOKEN } from './app.constants';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger = new Logger();

  constructor(
    @Inject(SUBCRIPTION_TOKEN)
    private readonly subscriptionService: ISubscriptionService,
  ) {}

  @MessagePattern({ cmd: 'add_subscriber' }, Transport.RMQ)
  async handleSubscribe(@Payload() data: CreateSubscriptionDto) {
    const result = await this.subscriptionService.createSubscription(data);
    this.logger.log(result);
    return result;
  }

  @MessagePattern({ cmd: 'get_all_subscribers' }, Transport.RMQ)
  async handleGetAllSubscribers() {
    const result = await this.subscriptionService.findAllSubscribers();
    this.logger.log(result);
    return result;
  }
}
