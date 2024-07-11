import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { IRateService } from './interfaces/rate-service.interface';
import { RATE_SERVICE_TOKEN } from './app.constants';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger = new Logger();

  constructor(
    @Inject(RATE_SERVICE_TOKEN) private readonly appService: IRateService,
  ) {}

  @MessagePattern({ cmd: 'get_rate' }, Transport.RMQ)
  async handleGetRate() {
    const exchangeRate = await this.appService.getExchangeRate();
    this.logger.log(exchangeRate);
    return exchangeRate;
  }
}
