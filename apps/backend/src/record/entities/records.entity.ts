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

  @Column({ default: RecordDirection.IN })
  record_direction: string;

  @Column({ default: RecordStatus.NEW })
  record_status: string;

  @Column()
  record_type: string;

  @Column({ nullable: true })
  record_subtype: string | null;

  @Column()
  record_comment: string;

  @CreateDateColumn()
  created_at: Date;
}
