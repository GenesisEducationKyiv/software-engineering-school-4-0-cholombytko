import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [AppService],
})
export class AppModule {}
