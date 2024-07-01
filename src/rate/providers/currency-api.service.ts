import { ICurrencyApiResponse } from '../interfaces/currency-api-response.interface';
import { IHandler } from '../interfaces/handler.interface';
import { IRate } from '../interfaces/rate.interface';
import { LogRateRequest } from '../logging/logger.decorator';
import { CURRENCY_API_URL } from '../rate.constants';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyApiHandler implements IHandler {
  constructor(private readonly httpService: HttpService) {}

  @LogRateRequest(CURRENCY_API_URL)
  async handle(): Promise<IRate> {
    const response = await firstValueFrom(
      this.httpService.get<ICurrencyApiResponse>(CURRENCY_API_URL),
    );
    const data = response.data;
    const date = new Date().toLocaleDateString();

    return {
      currencyCode: 'USD',
      date,
      rate: +data.usd['uah'],
    };
  }
}
