import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IRecordTypes,
  RecordType as RecordTypeEntity,
} from '~modules/record/entities/record_types.entity';

@Injectable()
export class RecordTypeRepository {
  constructor(
    @InjectRepository(RecordTypeEntity)
    private readonly recordTypeRepository: Repository<RecordTypeEntity>
  ) {}

  private standardizeType(type: string) {
    return type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase();
  }

  async findOrCreate(record_type: string): Promise<IRecordTypes> {
    const type = this.standardizeType(record_type);
    let recordType = await this.recordTypeRepository.findOne({
      where: { type },
    });

    if (!recordType) {
      recordType = this.recordTypeRepository.create({ type });
      await this.recordTypeRepository.save(recordType);
    }

    return recordType;
  }

  async findAll(): Promise<IRecordTypes[]> {
    return this.recordTypeRepository.find();
  }
}
