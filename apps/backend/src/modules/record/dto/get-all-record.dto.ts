import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { FieldsForSortRecords, Order } from '~common/enums';
import { FieldsForFilterRecords } from '~common/types';
import { parseFilters } from '../helpers/parseFilters';

export interface IGetRecordsDto {
  search?: string;
  filters?: FieldsForFilterRecords;
  sort: FieldsForSortRecords;
  order: Order;
  page: number;
  pageSize: number;
}

export class GetRecordsDto implements IGetRecordsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => parseFilters(value))
  filters?: FieldsForFilterRecords;

  @IsOptional()
  @IsEnum(FieldsForSortRecords)
  sort: FieldsForSortRecords = FieldsForSortRecords.created_at;

  @IsOptional()
  @IsEnum(Order)
  order: Order = Order.ASC;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageSize = 10;
}
