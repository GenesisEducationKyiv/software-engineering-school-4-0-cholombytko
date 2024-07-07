import { Controller, Get, Inject } from '@nestjs/common';
import { IRateService } from './interfaces/rate-service.interface';
import { RATE_SERVICE_TOKEN } from './app.constants';

@Controller()
export class AppController {
  constructor(
    @Inject(RATE_SERVICE_TOKEN) private readonly appService: IRateService,
  ) {}
}
