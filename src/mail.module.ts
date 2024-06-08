import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          auth: {
            pass: configService.get<string>('SMTP_PASSWORD'),
            user: configService.get<string>('SMTP_USER'),
          },
          host: configService.get<string>('SMTP_HOST'),
        },
      }),
    }),
  ],
})
export class MailModule {}
