import { BadRequestException, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES, statusTransitions } from '~common/constants';
import { RecordStatus } from '~common/enums';
import { IRecord } from '~modules/record/entities/records.entity';
import { RecordRepository } from '~repositories/record.repository';
import { IUpdateRecordStatusDto } from './dto/update-record-status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly recordRepository: RecordRepository) {}

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
    const {
      record_status: newStatus,
      reason_for_rejection: reasonForRejection,
    } = recordStatusDto;

    const record = await this.recordRepository.findById(id);

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

    return this.recordRepository.updateRecord(record);
  }
}
