import { EMAIL_SERVICE_TOKEN, MAILING_SERVICE_TOKEN } from './email.tokens';
import { Email } from './entities/email.entity';
import { EmailService } from './services/email.service';
import { MailingService } from './services/mailing.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [EMAIL_SERVICE_TOKEN, MAILING_SERVICE_TOKEN],
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [
    {
      provide: EMAIL_SERVICE_TOKEN,
      useClass: EmailService,
    },
    {
      provide: MAILING_SERVICE_TOKEN,
      useClass: MailingService,
    },
  ],
})
export class EmailModule {}
