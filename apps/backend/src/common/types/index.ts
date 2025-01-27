import { IRecord } from '~modules/record/entities/records.entity';
import { UserRole } from '../enums';

export interface JwtUserData {
  userid: number;
  username: string;
  role: UserRole;
}

export type FieldsForFilterRecords = Partial<
  Pick<IRecord, 'user_id' | 'record_status' | 'tax_period'> & {
    from: string;
    to: string;
  }
>; //TODO: 'record_type'
