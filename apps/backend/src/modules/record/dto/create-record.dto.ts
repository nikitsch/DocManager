import {
  IsNotEmpty,
  IsString,
  IsEnum,
  Length,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TaxPeriod } from '~common/enums';

export interface ICreateRecordDto {
  tax_period: TaxPeriod;
  record_type: string;
  record_subtype?: string;
  record_comment: string;
}

//TODO
// interface IRecordTypeDto {
//   value: number;
//   label: string;
// }

// @ValidatorConstraint({ async: false })
// class RecordTypeValidation implements ValidatorConstraintInterface {
//   validate(value: string) {
//     // console.log(value);
//     try {
//       const parseValue = JSON.parse(value);
//       if (typeof value === 'string' && value.startsWith('{')) {
//         value = JSON.parse(value);
//       }

//       if (typeof value === 'string') {
//         return value.length >= 3 && value.length <= 50;
//       }

//       if (parseValue !== null && typeof parseValue === 'object') {
//         return (
//           typeof parseValue.value === 'number' &&
//           typeof parseValue.label === 'string' &&
//           parseValue.label.length >= 3 &&
//           parseValue.label.length <= 50
//         );
//       }

//       return false;
//     } catch {
//       return false;
//     }
//   }

//   defaultMessage() {
//     return 'record_type должен быть строкой (3-50 символов) или объектом { value: number, label: string }';
//   }
// }

export class CreateRecordDto implements ICreateRecordDto {
  @IsEnum(TaxPeriod)
  tax_period: TaxPeriod;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  record_type: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  record_subtype?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  record_comment: string;
}
