import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../modules/user/entity/user.entity';
import { UserRole } from '../enums';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface CustomJwtPayload extends JwtPayload {
  userid: number;
  username: string;
  role: UserRole;
}
