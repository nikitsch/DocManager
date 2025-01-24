import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGES } from '~common/constants';
import { FieldsForFilterRecords } from '~common/types';

type Filters = FieldsForFilterRecords;

export function parseFilters(value?: string | Filters): Filters | undefined {
  if (!value) return undefined;

  if (typeof value === 'object') {
    return value as Filters;
  }

  try {
    return JSON.parse(value);
  } catch {
    throw new BadRequestException(ERROR_MESSAGES.INVALID_JSON);
  }
}
