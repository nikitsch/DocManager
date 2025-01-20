import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Record } from './entities/records.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UserService } from '../user/user.service';
import { RecordStatus } from '../../common/enums';
import { MinioService } from './minio.service';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import 'multer';
import { ERROR_MESSAGES, UNRECOGNIZED_FILE_EXTESION } from '../../common/constants';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload } from '../../common/types';

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
    req: Request,
    createRecordDto: CreateRecordDto,
    files: Express.Multer.File[]
  ): Promise<Record> {
    //TODO: check JwtStrategy
    const token = req.cookies?.jwt;
    if (!token) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
    }

    const { userid: user_id } = verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    const user = await this.userService.getUserById(user_id);
    const { organization_name } = user;

    const { tax_period, record_type, record_subtype, record_comment } =
      createRecordDto;

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

    if (record.record_status !== RecordStatus.NEW) {
      throw new BadRequestException(ERROR_MESSAGES.STATUS_DOESNT_ALLOW_CHANGES);
    }

    if (
      Object.keys(updateRecordDto).every(
        (key) => updateRecordDto[key] === record[key]
      )
    ) {
      throw new BadRequestException(ERROR_MESSAGES.NOTHING_TO_UPDATE);
    }

    const now = new Date();
    record.updated_at = record.updated_at
      ? [...record.updated_at, now.toISOString()]
      : [now.toISOString()];
    Object.assign(record, updateRecordDto);

    return this.recordRepository.save(record);
  }
}
