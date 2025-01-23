import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordStatus } from '~common/enums';

import { IUpdateRecordStatusDto } from './dto/update-record-status.dto';
import { ERROR_MESSAGES, statusTransitions } from '~common/constants';
import { IRecord, Record } from '~modules/record/entities/records.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  private canTransition(
    currentStatus: RecordStatus,
    nextStatus: RecordStatus
  ): boolean {
    const allowedTransitions = statusTransitions[currentStatus];
    return allowedTransitions.includes(nextStatus);
  }

  async updateRecordStatus(
    id: number,
    recordStatusDto: IUpdateRecordStatusDto
  ): Promise<IRecord> {
    const record = await this.recordRepository.findOne({
      where: { record_id: id },
    });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    const {
      record_status: newStatus,
      reason_for_rejection: reasonForRejection,
    } = recordStatusDto;

    if (!this.canTransition(record.record_status, newStatus)) {
      throw new BadRequestException(ERROR_MESSAGES.UPDATE_NOT_ALLOWED);
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
        throw new BadRequestException(
          ERROR_MESSAGES.REASON_FOR_REFUSAL_NOT_SPECIFIED
        );
      }

      record.rejected_at = now;
      record.reason_for_rejection = reasonForRejection;
    }

    record.record_status = newStatus;

    return await this.recordRepository.save(record);
  }
}
