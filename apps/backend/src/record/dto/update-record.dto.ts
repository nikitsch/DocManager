import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaxPeriod } from '../../types';

export class UpdateRecordDto {
  @IsEnum(TaxPeriod)
  @IsOptional()
  tax_period: TaxPeriod;

  @IsString()
  @IsOptional()
  record_subtype?: string;

  @IsString()
  @IsOptional()
  @Length(5, 255, {
    message: 'Comment must be between 5 and 255 characters',
  }) //TODO: Doesn't work
  record_comment?: string;
}
