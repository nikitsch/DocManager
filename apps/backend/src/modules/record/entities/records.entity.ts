import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RecordDirection, RecordStatus, TaxPeriod } from '~common/enums';
import { IRecordTypes, RecordType } from './record_types.entity';

export interface IRecord {
  record_id: number;
  user_id: number;
  organization_name: string;
  tax_period: TaxPeriod;
  record_number: string;
  record_direction: RecordDirection;
  record_status: RecordStatus;
  record_type_entity: IRecordTypes;
  record_subtype: string | null;
  record_comment: string;
  reason_for_rejection: string | null;
  created_at: Date;
  updated_at: string[] | null;
  in_process_at: Date | null;
  finished_at: Date | null;
  rejected_at: Date | null;
  record_files: {
    id: string;
    name: string;
    extension: string;
  }[];
}

export interface IRecordWithFileUrlResponse
  extends Omit<IRecord, 'record_files'> {
  record_files: {
    url: string;
    name: string;
    extension: string;
  }[];
}

@Entity('records')
export class Record implements IRecord {
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
    default: RecordDirection.IN,
  })
  record_direction: RecordDirection;

  @Column({
    type: 'enum',
    enum: RecordStatus,
    default: RecordStatus.NEW,
  })
  record_status: RecordStatus;

  @ManyToOne(() => RecordType, { cascade: true })
  @JoinColumn({ name: 'record_type_id' })
  record_type_entity: RecordType;

  @Column({ nullable: true })
  record_subtype: string | null;

  @Column()
  record_comment: string;

  @Column({ nullable: true })
  reason_for_rejection: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column('text', { array: true, nullable: true })
  updated_at: string[] | null;

  @Column({ type: 'timestamptz', nullable: true })
  in_process_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  finished_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  rejected_at: Date | null;

  @Column('jsonb')
  record_files: {
    id: string;
    name: string;
    extension: string;
  }[];
}
