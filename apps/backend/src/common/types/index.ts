import { User } from '../../modules/user/entity/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
