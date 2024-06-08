import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';

@Module({
  imports: [EmailModule],
  controllers: [SubscribeController],
  providers: [SubscribeService],
  exports: [SubscribeService],
})
export class SubscribeModule {}
