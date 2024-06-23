import { ICurrencyApiResponse } from '../interfaces/currency-api-response.interface';
import { IHandler } from '../interfaces/handler.interface';
import { IRate } from '../interfaces/rate.interface';
import { Log } from '../logging/logger.decorator';
import { CURRENCY_API_URL } from '../rate.constants';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyApiHandler implements IHandler {
  private nextHandler: IHandler;

  constructor(private readonly httpService: HttpService) {}

  setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  @Log(CURRENCY_API_URL)
  async handle(): Promise<IRate> {
    try {
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
    } catch (error) {
      if (this.nextHandler) {
        return this.nextHandler.handle();
      }
      throw error;
    }
  }
}
