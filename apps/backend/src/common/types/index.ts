import { JwtPayload } from 'jsonwebtoken';
import { User } from '~modules/user/entity/user.entity';
import { UserRole } from '../enums';
import { Record } from '~modules/record/entities/records.entity';

export type UserWithoutPassword = Omit<User, 'password'>;

export type RecordWithUrls = Omit<Record, 'record_files'> & {
  record_files: {
    url: string;
    name: string;
    extension: string;
  }[];
};

export interface CustomJwtPayload extends JwtPayload {
  userid: number;
  username: string;
  role: UserRole;
}

export type FieldsForFilterRecords = Partial<
  Pick<Record, 'record_status' | 'tax_period' | 'user_id'> & {
    from: string;
    to: string;
  }
>; //TODO: 'record_type'

export type FieldsForSortRecords =
  | 'created_at'
  | 'record_number'
  | 'record_type'; //TODO: свой порядок для tax_period, record_status
