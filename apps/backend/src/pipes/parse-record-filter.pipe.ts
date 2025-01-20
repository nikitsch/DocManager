import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '../common/constants';
import { FieldsForFilterRecords } from '../common/types';

@Injectable()
export class ParseRecordFilterPipe implements PipeTransform {
  transform(value?: string) {
    if (!value) return undefined;

    let parsedValue: FieldsForFilterRecords;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_JSON);
    }

    // const { record_status, tax_period, user_id, from, to } = parsedValue;

    return parsedValue;
  }
}
