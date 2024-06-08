import { Email } from './entities/email.entity';
import { EmailService } from './services/email.service';
import { MailingService } from './services/mailing.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [EmailService, MailingService],
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService, MailingService],
})
export class EmailModule {}
