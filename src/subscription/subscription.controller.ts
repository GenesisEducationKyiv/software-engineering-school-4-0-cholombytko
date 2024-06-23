import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscribeResult } from './interfaces/subscribe-response.interface';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { SUBSCRIPTION_SERVICE_TOKEN } from './subscription.tokens';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';

@Controller('subscribe')
export class SubscriptionController {
  constructor(
    @Inject(SUBSCRIPTION_SERVICE_TOKEN)
    private readonly subscriptionService: ISubscriptionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ISubscribeResult> {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
}
