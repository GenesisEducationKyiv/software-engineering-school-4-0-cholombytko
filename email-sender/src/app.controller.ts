import { Controller, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MAILING_SERVICE_TOKEN } from './app.constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailsDto } from './interfaces/send-emails-dto.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger();

  constructor(
    @Inject(MAILING_SERVICE_TOKEN) private readonly appService: AppService,
  ) {}

  @MessagePattern({ cmd: 'send-emails' })
  async handleSendEmails(@Payload() data: SendEmailsDto) {
    const result = await this.appService.sendMailsToSubscribers(
      data.subscribers,
      data.payload,
    );
    this.logger.log(result);
    return result;
  }
}
