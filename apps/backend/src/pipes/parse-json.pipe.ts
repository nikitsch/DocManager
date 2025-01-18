import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateRecordDto } from '../modules/record/dto/create-record.dto';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: string): CreateRecordDto {
    let parsedValue: Partial<Omit<CreateRecordDto, 'user_id'>> & {
      user_id?: number | string;
    };

    try {
      parsedValue = JSON.parse(value);
    } catch {
      throw new BadRequestException('Invalid JSON string');
    }

    const { user_id, tax_period, record_type, record_subtype, record_comment } =
      parsedValue;

    if (!user_id || !tax_period || !record_type || !record_comment) {
      throw new BadRequestException('Missing required fields');
    }

    if (
      typeof record_comment !== 'string' ||
      record_comment.length < 5 ||
      record_comment.length > 255
    ) {
      throw new BadRequestException(
        'Comment must be a string between 5 and 255 characters'
      );
    }

    return {
      user_id: Number(user_id),
      tax_period,
      record_type,
      record_subtype,
      record_comment,
    };
  }
}
