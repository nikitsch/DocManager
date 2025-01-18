import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/records.entity';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from '../user/user.module';
import { MinioService } from './minio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  providers: [RecordService, MinioService],
  controllers: [RecordController],
})
export class RecordModule {}
