import { IChainManager } from '../interfaces/chain-manager.interface';
import { IHandler } from '../interfaces/handler.interface';
import { IRate } from '../interfaces/rate.interface';
import { IRateService } from '../interfaces/rate-service.interface';
import {
  CHAIN_MANAGER_TOKEN,
  CURRENCY_API_HANDLER_TOKEN,
  NBU_HANDLER_TOKEN,
  PRIVATBANK_HANDLER_TOKEN,
} from '../rate.constants';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RateService implements IRateService {
  constructor(
    @Inject(CHAIN_MANAGER_TOKEN) private readonly chainManager: IChainManager,
    @Inject(NBU_HANDLER_TOKEN) private readonly nbuHandler: IHandler,
    @Inject(CURRENCY_API_HANDLER_TOKEN)
    private readonly currencyHandler: IHandler,
    @Inject(PRIVATBANK_HANDLER_TOKEN)
    private readonly privatbankHandler: IHandler,
  ) {
    this.chainManager.addHandler(this.nbuHandler);
    this.chainManager.addHandler(this.privatbankHandler);
    this.chainManager.addHandler(this.currencyHandler);
  }

  public async getExchangeRate(): Promise<IRate> {
    try {
      const response = await this.chainManager.executeChain();
      return response;
    } catch (error) {
      throw new HttpException('Invalid status value', HttpStatus.BAD_REQUEST);
    }
  }
}
