import { IHandler } from '../interfaces/handler.interface';
import { IPrivatBankApiResponse } from '../interfaces/privatbank-api-response.interface';
import { IRate } from '../interfaces/rate.interface';
import { LogRateRequest } from '../logging/logger.decorator';
import { PRIVATBANK_API_URL } from '../rate.constants';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PrivatBankHandler implements IHandler {
  constructor(private readonly httpService: HttpService) {}

  @LogRateRequest(PRIVATBANK_API_URL)
  async handle(): Promise<IRate> {
    const response = await firstValueFrom(
      this.httpService.get<IPrivatBankApiResponse[]>(PRIVATBANK_API_URL),
    );
    const data = response.data[1];
    const date = new Date().toLocaleDateString();

    return {
      currencyCode: data.ccy,
      date,
      rate: +data.buy,
    };
  }
}
