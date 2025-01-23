import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../enums';
import { IRecord } from '~modules/record/entities/records.entity';

export interface CustomJwtPayload extends JwtPayload {
  userid: number;
  username: string;
  role: UserRole;
}

export type FieldsForFilterRecords = Partial<
  Pick<IRecord, 'record_status' | 'tax_period' | 'user_id'> & {
    from: string;
    to: string;
  }
>; //TODO: 'record_type'

export type FieldsForSortRecords =
  | 'created_at'
  | 'record_number'
  | 'record_type'; //TODO: свой порядок для tax_period, record_status
