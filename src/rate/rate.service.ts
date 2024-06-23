import { IHandler } from './interfaces/handler.interface';
import { IRate } from './interfaces/rate.interface';
import { IRateService } from './interfaces/rate-service.interface';
import {
  CURRENCY_API_HANDLER_TOKEN,
  NBU_HANDLER_TOKEN,
  PRIVATBANK_HANDLER_TOKEN,
} from './rate.constants';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RateService implements IRateService {
  constructor(
    @Inject(NBU_HANDLER_TOKEN) private readonly nbuHandler: IHandler,
    @Inject(CURRENCY_API_HANDLER_TOKEN)
    private readonly currencyHandler: IHandler,
    @Inject(PRIVATBANK_HANDLER_TOKEN)
    private readonly privatbankHandler: IHandler,
  ) {
    this.nbuHandler
      .setNext(this.currencyHandler)
      .setNext(this.privatbankHandler);
  }

  public async getExchangeRate(): Promise<IRate> {
    try {
      const response = await this.nbuHandler.handle();
      return response;
    } catch (error) {
      throw new HttpException('Invalid status value', HttpStatus.BAD_REQUEST);
    }
  }
}
