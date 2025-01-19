import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/records.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UserService } from '../user/user.service';
import { RecordStatus } from '../../common/enums';
import { MinioService } from './minio.service';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import 'multer';
import { UNRECOGNIZED_FILE_EXTESION } from '../../common/constants';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly userService: UserService,
    private readonly minioService: MinioService
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

    return record; //TODO: get files links
  }

  private async uploadFiles(files: Express.Multer.File[]) {
    if (!files) {
      return [];
    }

    const fileData = await Promise.all(
      files.map(async ({ buffer, mimetype, originalname }) => {
        const fileId = uuidv4();
        const fileExtension =
          mime.extension(mimetype) || UNRECOGNIZED_FILE_EXTESION;
        const objectName = `${fileId}.${fileExtension}`;

        // Загрузка файла в MinIO //TODO: place next to creation of recordRepository collection item
        await this.minioService.uploadFile(objectName, buffer, mimetype);

        return {
          id: fileId,
          name: originalname,
          extension: fileExtension,
        };
      })
    );

    return fileData;
  }

  async createRecord(
    createRecordDto: CreateRecordDto,
    files: Express.Multer.File[]
  ): Promise<Record> {
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

    const record_files = await this.uploadFiles(files);

    const newRecord = this.recordRepository.create({
      user_id,
      tax_period,
      record_type,
      record_subtype,
      record_comment,
      record_number,
      organization_name,
      record_files,
    });

    return this.recordRepository.save(newRecord);
  }

  //TODO: after adding roles redo
  async updateRecord(
    id: number,
    updateRecordDto: UpdateRecordDto
  ): Promise<Record> {
    const record = await this.getRecordById(id);

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
