import { IHandler } from '../interfaces/handler.interface';
import { INBUApiResponse } from '../interfaces/nbu-api-response.interface';
import { IRate } from '../interfaces/rate.interface';
import { LogRateRequest } from '../logging/logger.decorator';
import { NBU_EXCHANGE_API_URL } from '../rate.constants';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NBUHandler implements IHandler {
  constructor(private readonly httpService: HttpService) {}

  @LogRateRequest(NBU_EXCHANGE_API_URL)
  async handle(): Promise<IRate> {
    const response = await firstValueFrom(
      this.httpService.get<INBUApiResponse[]>(NBU_EXCHANGE_API_URL),
    );
    const data = response.data[0];
    const date = new Date().toLocaleDateString();

    return {
      currencyCode: data.cc,
      date,
      rate: data.rate,
    };
  }
}
