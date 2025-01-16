import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { RecordStatus } from '../../../common/enums';

export class UpdateRecordStatusDto {
  @IsEnum(RecordStatus)
  @IsOptional()
  record_status: RecordStatus;

  @IsString()
  @Length(5, 255, {
    message: 'Comment must be between 5 and 255 characters',
  }) //TODO: Doesn't work
  reason_for_rejection?: string;
}
