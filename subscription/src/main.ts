import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const RMQ_USER = process.env.RABBITMQ_DEFAULT_USER;
  const RMQ_PASSWORD = process.env.RABBITMQ_DEFAULT_PASSWORD;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        queue: 'subscription_queue',
        queueOptions: {
          durable: false,
        },
        urls: [`amqp://${RMQ_USER}:${RMQ_PASSWORD}@rabbitmq:5672`],
      },
      transport: Transport.RMQ,
    },
  );
  await app.listen();
}
bootstrap();
