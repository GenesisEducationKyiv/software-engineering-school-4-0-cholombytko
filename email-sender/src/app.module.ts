import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MAILING_SERVICE_TOKEN } from './app.constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        auth: {
          pass: process.env.SMTP_PASSWORD,
          user: process.env.SMTP_USER,
        },
        host: process.env.SMTP_HOST,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: MAILING_SERVICE_TOKEN,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
