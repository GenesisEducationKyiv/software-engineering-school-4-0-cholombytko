import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [SubscribeController],
  exports: [SubscribeService],
  imports: [EmailModule],
  providers: [SubscribeService],
})
export class SubscribeModule {}
