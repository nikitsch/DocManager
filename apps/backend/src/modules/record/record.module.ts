import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioService } from '~minio/minio.service';
import { UserModule } from '~modules/user/user.module';
import { Record } from './entities/records.entity';
import { RecordRepository } from '~repositories/record.repository';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  providers: [RecordService, RecordRepository, MinioService],
  controllers: [RecordController],
})
export class RecordModule {}
