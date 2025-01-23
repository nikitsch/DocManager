import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RecordStatus } from '~common/enums';

export interface IUpdateRecordStatusDto {
  record_status: RecordStatus;
  reason_for_rejection?: string;
}

export class UpdateRecordStatusDto implements IUpdateRecordStatusDto {
  @IsEnum(RecordStatus)
  @IsNotEmpty()
  record_status: RecordStatus;

  @IsString()
  @IsOptional()
  @Length(5, 255)
  reason_for_rejection?: string;
}
