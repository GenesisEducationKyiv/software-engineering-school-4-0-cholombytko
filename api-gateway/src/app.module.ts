import { API_GATEWAY_TOKEN } from './app.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AppController, SubscriptionController],
  imports: [
    ClientsModule.register([
      {
        name: 'SUBSCRIPTION_SERVICE',
        options: {
          queue: 'subscription_queue',
          queueOptions: {
            durable: false,
          },
          urls: [
            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASSWORD}@rabbitmq:5672`,
          ],
        },
        transport: Transport.RMQ,
      },
    ]),
  ],
  providers: [
    {
      provide: API_GATEWAY_TOKEN,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
