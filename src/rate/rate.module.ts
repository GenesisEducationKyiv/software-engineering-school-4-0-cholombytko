import { CurrencyApiHandler } from './providers/currency-api.service';
import { NBUHandler } from './providers/nbu.service';
import { PrivatBankHandler } from './providers/privatbank.service';
import {
  CHAIN_MANAGER_TOKEN,
  CURRENCY_API_HANDLER_TOKEN,
  NBU_HANDLER_TOKEN,
  PRIVATBANK_HANDLER_TOKEN,
  RATE_SERVICE_TOKEN,
} from './rate.constants';
import { RateController } from './rate.controller';
import { ChainManager } from './services/chain-manager.service';
import { RateService } from './services/rate.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RateController],
  exports: [RATE_SERVICE_TOKEN],
  imports: [HttpModule],
  providers: [
    {
      provide: CHAIN_MANAGER_TOKEN,
      useClass: ChainManager,
    },
    {
      provide: RATE_SERVICE_TOKEN,
      useClass: RateService,
    },
    {
      provide: NBU_HANDLER_TOKEN,
      useClass: NBUHandler,
    },
    {
      provide: CURRENCY_API_HANDLER_TOKEN,
      useClass: CurrencyApiHandler,
    },
    {
      provide: PRIVATBANK_HANDLER_TOKEN,
      useClass: PrivatBankHandler,
    },
  ],
})
export class RateModule {}
