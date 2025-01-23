import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '~modules/user/user.module';
import { StatusModule } from '~modules/status/status.module';
import { RecordModule } from '~modules/record/record.module';
import { AuthModule } from '~modules/auth/auth.module';
import { JwtAuthGuard } from '~guards/jwt-auth.guard';
import { JwtStrategy } from '~strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      dropSchema: false,
      // synchronize: true, //* Synchronization of the DB with entities and automatic migration to the DB when the entity changes
      // logging: true
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
