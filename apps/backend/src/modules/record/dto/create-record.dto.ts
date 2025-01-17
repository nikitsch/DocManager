import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Length,
  IsOptional,
} from 'class-validator';
import { TaxPeriod } from '../../../common/enums';

export class CreateRecordDto {
  @IsEnum(TaxPeriod)
  tax_period: TaxPeriod;

  @IsString()
  @IsNotEmpty()
  record_type: string;

  @IsString()
  @IsOptional()
  record_subtype?: string;

  @IsString()
  @Length(5, 255, {
    message: 'Comment must be between 5 and 255 characters',
  }) //TODO: Doesn't work
  record_comment: string;
}
