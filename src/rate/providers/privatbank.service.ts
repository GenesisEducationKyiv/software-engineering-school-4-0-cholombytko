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
  private nextHandler: IHandler;

  constructor(private readonly httpService: HttpService) {}

  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  @LogRateRequest(PRIVATBANK_API_URL)
  async handle(): Promise<IRate> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IPrivatBankApiResponse[]>(PRIVATBANK_API_URL),
      );
      const data = response.data[0];
      const date = new Date().toLocaleDateString();

      return {
        currencyCode: data.ccy,
        date,
        rate: +data.buy,
      };
    } catch (error) {
      if (this.nextHandler) {
        return this.nextHandler.handle();
      }
      throw error;
    }
  }
}
