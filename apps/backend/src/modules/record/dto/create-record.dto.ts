import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Length,
  IsOptional,
} from 'class-validator';
import { TaxPeriod } from '~common/enums';

export interface ICreateRecordDto {
  tax_period: TaxPeriod;
  record_type: string;
  record_subtype?: string;
  record_comment: string;
}

export class CreateRecordDto implements ICreateRecordDto {
  @IsEnum(TaxPeriod)
  tax_period: TaxPeriod;

  @IsString()
  @IsNotEmpty()
  record_type: string;

  @IsString()
  @IsOptional()
  record_subtype?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  record_comment: string;
}
