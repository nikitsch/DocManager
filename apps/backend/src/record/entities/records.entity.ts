import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn
} from 'typeorm';
import { RecordDirection, RecordStatus, TaxPeriod } from '../../types';

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column()
  user_id: number;

  @Column()
  organization_name: string;

  @Column({
    type: 'enum',
    enum: TaxPeriod,
  })
  tax_period: TaxPeriod;

  @Column()
  record_number: string;

  @Column({
    type: 'enum',
    enum: RecordDirection,
    default: RecordDirection.IN
  })
  record_direction: RecordDirection;

  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.NEW
  })
  record_status: RecordStatus;

  @Column()
  record_type: string;

  @Column({ nullable: true })
  record_subtype: string | null;

  @Column()
  record_comment: string;

  @Column({ nullable: true })
  reason_for_rejection: string | null;

  @CreateDateColumn()
  created_at: Date;

  @Column('text', { array: true, nullable: true })
  updated_at: string[] | null;

  @Column({ type: 'timestamp', nullable: true })
  in_process_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  finished_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  rejected_at: Date | null;
}
