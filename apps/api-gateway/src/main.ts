// import { NestFactory } from '@nestjs/core';
// import { ApiGatewayModule } from './api-gateway.module';

// async function bootstrap() {
//   const app = await NestFactory.create(ApiGatewayModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for Microservices')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger available at /api

  const port = process.env.port ?? 3000;
  await app.listen(port);
  console.log(`API Gateway running on http://localhost:${port}`);
  console.log(`Swagger docs available on http://localhost:${port}/api`);
}

bootstrap();
