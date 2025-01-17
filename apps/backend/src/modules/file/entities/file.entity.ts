import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  files: {
    id: string;
    name: string;
    extension: string;
  }[];
}
