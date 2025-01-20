import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../modules/user/entity/user.entity';
import { UserRole } from '../enums';
import { Record } from '../../modules/record/entities/records.entity';

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
