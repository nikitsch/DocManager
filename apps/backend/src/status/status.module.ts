import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../record/entities/records.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [StatusService],
  controllers: [StatusController],
})
export class StatusModule {}
