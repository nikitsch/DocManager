/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  // app.enableCors(); //TODO Включить CORS
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //* Removes properties not included in DTO.
      // forbidNonWhitelisted: true, //* In combination `whitelist: true` we return an error if a property is received that is not in the DTO.
      // transform: true, //* Global transformation of all incoming data via DTO.
    })
  );
  const port = process.env.API_PORT ?? 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🦩 MinIO is running on: http://localhost:${process.env.MINIO_PORT_ONE}`
  );
}

bootstrap();
