import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaxPeriod } from '~common/enums';

export interface IUpdateRecordDto {
  tax_period?: TaxPeriod;
  record_subtype?: string;
  record_comment?: string;
}

export class UpdateRecordDto implements IUpdateRecordDto {
  @IsEnum(TaxPeriod)
  @IsOptional()
  tax_period: TaxPeriod;

  @IsString()
  @IsOptional()
  record_subtype?: string;

  @IsString()
  @IsOptional()
  @Length(5, 255)
  record_comment?: string;
}
