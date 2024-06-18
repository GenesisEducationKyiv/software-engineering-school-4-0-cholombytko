import { IRateService } from './interfaces/rate-service.interface';
import { Controller, Get } from '@nestjs/common';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: IRateService) {}

  @Get()
  public async getExchangeRate() {
    const result = await this.rateService.getExchangeRate();
    return result;
  }
}
