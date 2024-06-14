import { IGetExchangeRateResponse } from './interfaces/get-exchange-rate.interface';
import { IRate } from './interfaces/rate.interface';
import { API_URL } from './rate.constants';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RateService {
  constructor(private httpService: HttpService) {}

  public async getExchangeRate(): Promise<IRate> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IGetExchangeRateResponse[]>(API_URL),
      );

      const data = response.data[0];

      return {
        currencyCode: data.cc,
        date: data.exchangedate,
        rate: data.rate,
      };
    } catch (error) {
      throw new HttpException('Invalid status value', HttpStatus.BAD_REQUEST);
    }
  }
}
