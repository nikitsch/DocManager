/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api'; //TODO Для чего он
  // app.enableCors(); //TODO Включить CORS
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })); //TODO: включить валидацию DTO?
  const port = process.env.API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
