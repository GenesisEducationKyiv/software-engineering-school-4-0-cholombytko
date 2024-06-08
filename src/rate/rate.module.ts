import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';

@Module({
  imports: [HttpModule],
  controllers: [RateController],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
