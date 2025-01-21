import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/records.entity';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MinioService } from './minio.service';
import { UserModule } from '~modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  providers: [RecordService, MinioService],
  controllers: [RecordController],
})
export class RecordModule {}
