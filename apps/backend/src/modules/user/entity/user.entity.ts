import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '~common/enums';

export interface IUser {
  user_id: number;
  username: string;
  password: string;
  role: UserRole;
  organization_name: string;
}

export type IUserWithoutPassword = Pick<
  IUser,
  'user_id' | 'username' | 'role' | 'organization_name'
>;

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  organization_name: string;
}
