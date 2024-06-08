import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscribeResult } from './interfaces/subscribe-response.interface';
import { SubscribeService } from './subscribe.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ISubscribeResult> {
    return this.subscribeService.createSubscription(createSubscriptionDto);
  }
}
