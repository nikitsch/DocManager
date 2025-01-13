import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../../types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
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
