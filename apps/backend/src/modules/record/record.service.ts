import { Request } from 'express';
import { ILike, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES, UNRECOGNIZED_FILE_EXTESION } from '~common/constants';
import { RecordStatus, UserRole } from '~common/enums';
import { IJwtStrategyValidate } from '~common/types';
import { UserService } from '~modules/user/user.service';
import { ICreateRecordDto } from './dto/create-record.dto';
import { IGetRecordsDto } from './dto/get-all-record.dto';
import { IUpdateRecordDto } from './dto/update-record.dto';
import {
  IRecord,
  IRecordWithFileUrlResponse,
  Record as RecordEntity,
} from './entities/records.entity';
import { MinioService } from './minio.service';

import * as mime from 'mime-types';
import 'multer';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
    private readonly userService: UserService,
    private readonly minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  async getAllRecords(
    req: Request,
    query: IGetRecordsDto
  ): Promise<{ data: IRecord[]; total: number }> {
    const { user_id, role } = req?.user as IJwtStrategyValidate;
    const { search, filters, sort, order, page, pageSize } = query;

    const where: Record<string, string | number | object> = {};

    //* Search
    if (search) {
      where.record_number = ILike(`%${search}%`);
    }

    //* Filtration
    if (role !== UserRole.ADMIN) {
      where.user_id = user_id;
    }

    if (filters) {
      if (role !== UserRole.ADMIN && filters.user_id !== user_id) {
        throw new BadRequestException(
          ERROR_MESSAGES.MESSAGE_AN_AUTHORSHIP_ERROR
        );
      }

      if (filters.user_id && role === UserRole.ADMIN) {
        where.user_id = filters.user_id;
      }

      if (filters.tax_period) {
        where.tax_period = filters.tax_period;
      }

      if (filters.record_status) {
        where.record_status = filters.record_status;
      }

      // if (filters.record_type) {
      //   where.record_type = filters.record_type;
      // }

      if (filters.from || filters.to) {
        where.created_at = {};

        if (filters.from) {
          where.created_at['$gte'] = filters.from;
        }

        if (filters.to) {
          where.created_at['$lte'] = filters.to;
        }
      }
    }

    const [data, total] = await this.recordRepository.findAndCount({
      where,
      order: { [sort]: order }, //TODO: custom order for record_status
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data, total };
  }

  async getRecordByIdWithUrls(id: number): Promise<IRecordWithFileUrlResponse> {
    const record = await this.getRecordById(id);
    const { record_files, ...rest } = record;

    const recordWithUrls = await Promise.all(
      record_files.map(async ({ id, extension, name }) => {
        const objectName = `${id}.${extension}`;
        const url = await this.minioService.generatePresignedUrl(
          objectName,
          name
        );

        return { url, name, extension };
      })
    );

    return { ...rest, record_files: recordWithUrls };
  }

  async getRecordById(id: number): Promise<IRecord> {
    const record = await this.recordRepository.findOne({
      where: { record_id: id },
    });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return record;
  }

  private async uploadFiles(files: Express.Multer.File[]) {
    if (!files?.length) {
      throw new BadRequestException('files should not be empty');
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
    createRecordDto: ICreateRecordDto,
    files: Express.Multer.File[]
  ): Promise<IRecord> {
    const { user_id } = req?.user as IJwtStrategyValidate;
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

  async updateRecord(
    id: number,
    updateRecordDto: IUpdateRecordDto
  ): Promise<IRecord> {
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
