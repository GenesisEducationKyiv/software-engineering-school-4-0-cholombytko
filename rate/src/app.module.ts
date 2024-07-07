import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import {
  CHAIN_MANAGER_TOKEN,
  CURRENCY_API_HANDLER_TOKEN,
  NBU_HANDLER_TOKEN,
  PRIVATBANK_HANDLER_TOKEN,
  RATE_SERVICE_TOKEN,
} from './app.constants';
import { ChainManager } from './providers/chain-manager.provider';
import { CurrencyApiHandler } from './providers/currency-api.service';
import { NBUHandler } from './providers/nbu.service';
import { PrivatBankHandler } from './providers/privatbank.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    {
      provide: RATE_SERVICE_TOKEN,
      useClass: AppService,
    },
    {
      provide: CHAIN_MANAGER_TOKEN,
      useClass: ChainManager,
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
export class AppModule {}
