import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'product_queue',
      queueOptions: { durable: false },
    },
  });

  await app.listen();
  console.log('Product microservice running...');
}
bootstrap();
