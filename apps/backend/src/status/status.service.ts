import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordStatus } from '../types';
import { Record } from '../record/entities/records.entity';
import { UpdateRecordStatusDto } from './dto/update-record-status.dto';
import { statusTransitions } from './constants';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  private canTransition(currentStatus: RecordStatus, nextStatus: RecordStatus): boolean {
    const allowedTransitions = statusTransitions[currentStatus];
    return allowedTransitions.includes(nextStatus);
  }

  async updateRecordStatus(id: number, recordStatusDto: UpdateRecordStatusDto): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { record_id: id } });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    const {record_status: newStatus, reason_for_rejection: reasonForRejection} = recordStatusDto;

    if (!this.canTransition(record.record_status, newStatus)) {
      throw new BadRequestException('Update is not allowed');
    }

    const now = new Date();
    if (newStatus === RecordStatus.IN_PROCESS) {
      record.in_process_at = now;
    }

    if (newStatus === RecordStatus.FINISHED) {
      record.finished_at = now;
    }

    if (newStatus === RecordStatus.REJECTED) {
      if (!reasonForRejection?.length) {
        throw new BadRequestException('No reason for rejection was given');
      }

      record.rejected_at = now;
      record.reason_for_rejection = reasonForRejection;
    }

    record.record_status = newStatus;

    return await this.recordRepository.save(record);
  }
}


