import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '~modules/record/entities/records.entity';
import { RecordRepository } from '~repositories/record.repository';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [StatusService, RecordRepository],
  controllers: [StatusController],
})
export class StatusModule {}
