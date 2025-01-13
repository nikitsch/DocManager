import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordModule } from '../record/record.module';
import { UserModule } from '../user/user.module';
import { StatusModule } from '../status/status.module';

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
      synchronize: true, //TODO switch off in production
      dropSchema: false,
      // logging: true
    }),
    UserModule,
    RecordModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
