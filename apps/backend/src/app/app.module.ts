import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '~guards/jwt-auth.guard';
import { UserModule } from '~modules/user/user.module';
import { StatusModule } from '~modules/status/status.module';
import { RecordModule } from '~modules/record/record.module';
import { AuthModule } from '~modules/auth/auth.module';
import { JwtStrategy } from '~strategies/jwt.strategy';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PG_PORT: Joi.number().required(),
        PG_USER: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_DB: Joi.string().required(),
        MINIO_USER: Joi.string().required(),
        MINIO_PASSWORD: Joi.string().required(),
        MINIO_PORT_ONE: Joi.number().required(),
        MINIO_USE_SSL: Joi.boolean().required(),
        MINIO_FILES_BUCKET_NAME: Joi.string().required(),
        MINIO_URL_LIFESPAN: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_LIFESPAN: Joi.string().required(),
        JWT_MAX_AGE_IN_COOKIE: Joi.number().required(),
        BCRYPT_SALT: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Подключаем ConfigModule для доступа к ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DB'),
        autoLoadEntities: true,
        dropSchema: false,
        // synchronize: true, //* Synchronization of the DB with entities and automatic migration to the DB when the entity changes
        // logging: true
      }),
    }),
    AuthModule,
    UserModule,
    RecordModule,
    StatusModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
