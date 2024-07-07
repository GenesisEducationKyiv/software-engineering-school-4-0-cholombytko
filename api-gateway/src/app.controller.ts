import { API_GATEWAY_TOKEN } from './app.constants';
import { AppService } from './app.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ISubscribeResponse } from './interfaces/subscribe-response.interface';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

@Controller()
export class AppController {
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
}
