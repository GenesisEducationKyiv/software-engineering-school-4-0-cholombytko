import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RateController],
  exports: [RateService],
  imports: [HttpModule],
  providers: [RateService],
})
export class RateModule {}
