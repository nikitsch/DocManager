import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../enums';
import { IRecord } from '~modules/record/entities/records.entity';

export interface IJwtStrategyValidate {
  user_id: number;
  username: string;
  role: UserRole;
}

export interface CustomJwtPayload extends JwtPayload {
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
