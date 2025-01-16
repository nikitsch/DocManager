import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/records.entity';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
