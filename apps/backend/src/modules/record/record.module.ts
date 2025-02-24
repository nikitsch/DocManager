import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioService } from '~minio/minio.service';
import { UserModule } from '~modules/user/user.module';
import { Record } from './entities/records.entity';
import { RecordType } from './entities/record_types.entity';
import { RecordRepository } from '~repositories/record.repository';
import { RecordTypeRepository } from '~repositories/record-type.repository';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    TypeOrmModule.forFeature([RecordType]),
    UserModule,
  ],
  providers: [
    RecordService,
    RecordRepository,
    RecordTypeRepository,
    MinioService,
  ],
  controllers: [RecordController],
})
export class RecordModule {}
