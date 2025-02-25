import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '~common/enums';
import {
  IRecord,
  Record as RecordEntity,
} from '~modules/record/entities/records.entity';

@Injectable()
export class RecordRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>
  ) {}

  async createRecord(
    recordData: Pick<
      IRecord,
      | 'user_id'
      | 'tax_period'
      | 'record_type_entity'
      | 'record_subtype'
      | 'record_comment'
      | 'record_number'
      | 'organization_name'
      | 'record_files'
    >
  ): Promise<IRecord> {
    const newRecord = this.recordRepository.create(recordData);
    return this.recordRepository.save(newRecord);
  }

  async updateRecord(record: IRecord): Promise<IRecord> {
    return this.recordRepository.save(record);
  }

  async findForTable(query: {
    where: Record<string, string | number | object>;
    order: { [x: string]: Order };
    skip: number;
    take: number;
  }): Promise<[data: IRecord[], total: number]> {
    return this.recordRepository.findAndCount({
      ...query,
      relations: ['record_type_entity'], // Make a JOIN from the `record_types` Entity to place the `record_type_entity` field in the response
    });
  }

  async createBaseQueryBuilder() {
  // createBaseQueryBuilder(): SelectQueryBuilder<IRecord> {
    return this.recordRepository.createQueryBuilder('record')
      .leftJoinAndSelect('record.record_type_entity', 'recordType'); // Добавляем JOIN
  }

  async findById(id: number): Promise<IRecord | undefined> {
    const record = await this.recordRepository.findOne({
      where: { record_id: id },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return record;
  }

  async getCount(): Promise<number> {
    return this.recordRepository.count();
  }

  async deleteRecord(id: number): Promise<void> {
    const result = await this.recordRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
  }
}
