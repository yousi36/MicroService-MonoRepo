import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CatalogModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'catalog_queue',
      queueOptions: { durable: false },
    },
  });

  await app.listen();
  console.log('Catalog microservice running...');
}
bootstrap();
