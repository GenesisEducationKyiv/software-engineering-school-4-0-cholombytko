import { API_GATEWAY_TOKEN } from '../app.constants';
import { AppService } from '../app.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { ISubscribeResponse } from '../interfaces/subscribe-response.interface';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { RemoveSubscriptionDto } from 'src/dto/remove-subscription.dto';
import { IUnsubscribeResponse } from 'src/interfaces/unsubscribe-response.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject(API_GATEWAY_TOKEN)
    private readonly apiGatewayService: AppService,
  ) {}

  @Post('/subscribe')
  @HttpCode(HttpStatus.OK)
  async subscribe(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ISubscribeResponse> {
    await this.apiGatewayService.subscribe(createSubscriptionDto);
    return { message: 'E-mail successfully subscribed' };
  }

  @Post('/unsubscribe')
  async unsubscribe(
    @Body() removeSubscriptionDto: RemoveSubscriptionDto,
  ): Promise<IUnsubscribeResponse> {
    await this.apiGatewayService.unsubscribe(removeSubscriptionDto);
    return { message: 'E-mail succesfully unsubscribed' };
  }
}
