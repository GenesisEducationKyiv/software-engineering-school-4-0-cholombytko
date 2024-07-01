import { IRateService } from './interfaces/rate-service.interface';
import { RATE_SERVICE_TOKEN } from './rate.constants';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('rate')
export class RateController {
  constructor(
    @Inject(RATE_SERVICE_TOKEN) private readonly rateService: IRateService,
  ) {}

  @Get()
  public async getExchangeRate() {
    const result = await this.rateService.getExchangeRate();
    return result;
  }
}
