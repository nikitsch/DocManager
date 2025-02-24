import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IRecordTypes {
  id: number;
  type: string;
}

@Entity('record_types')
export class RecordType implements IRecordTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: string;
}
