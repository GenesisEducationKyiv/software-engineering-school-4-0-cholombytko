import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscribeResult } from './interfaces/subscribe-response.interface';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: ISubscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ISubscribeResult> {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
}
