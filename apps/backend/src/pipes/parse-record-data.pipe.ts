import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateRecordDto } from '~modules/record/dto/create-record.dto';
import { ERROR_MESSAGES } from '~common/constants';

@Injectable()
export class ParseRecordDataPipe implements PipeTransform {
  transform(value: string): CreateRecordDto {
    let parsedValue: Partial<CreateRecordDto>;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_JSON);
    }

    const { tax_period, record_type, record_subtype, record_comment } =
      parsedValue;

    if (!tax_period || !record_type || !record_comment) {
      throw new BadRequestException(ERROR_MESSAGES.MISSING_FIELD);
    }

    if (
      typeof record_comment !== 'string' ||
      record_comment.length < 5 ||
      record_comment.length > 255
    ) {
      throw new BadRequestException(ERROR_MESSAGES.RECORD_COMMENT_LENGTH);
    }

    return {
      tax_period,
      record_type,
      record_subtype,
      record_comment,
    };
  }
}
