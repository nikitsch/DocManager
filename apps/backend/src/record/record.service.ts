import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/records.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UserService } from '../user/user.service';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly userService: UserService
  ) {}

  async getAllRecords(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  async getRecordById(id: number): Promise<Record> {
    const record = await this.recordRepository.findOne({
      where: { record_id: id },
    });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return record;
  }

  async createRecord(createRecordDto: CreateRecordDto): Promise<Record> {
    const { user_id, tax_period, record_type, record_subtype, record_comment } =
      createRecordDto;

    const user = await this.userService.getUserById(user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    const { organization_name } = user;

    const generateRecordNumber = (arr: number[]) =>
      arr.map((el) => String(el).padStart(2, '0')).join('');
    const recordCount = await this.recordRepository.count();
    const today = new Date();
    const record_number = generateRecordNumber([
      user_id,
      today.getDate(),
      today.getMonth() + 1,
      recordCount + 1,
    ]);

    const newRecord = this.recordRepository.create({
      user_id,
      tax_period,
      record_type,
      record_subtype,
      record_comment,
      record_number,
      organization_name,
    });

    return this.recordRepository.save(newRecord);
  }

  //TODO: after adding roles redo
  async updateRecord(
    id: number,
    updateRecordDto: UpdateRecordDto
  ): Promise<Record> {
    const record = await this.recordRepository.findOne({
      where: { record_id: id },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    if (
      Object.keys(updateRecordDto).every(
        (key) => updateRecordDto[key] === record[key]
      )
    ) {
      throw new BadRequestException('Nothing to update');
    }

    const now = new Date();
    record.updated_at = record.updated_at
      ? [...record.updated_at, now.toISOString()]
      : [now.toISOString()];
    Object.assign(record, updateRecordDto);

    return this.recordRepository.save(record);
  }
}
