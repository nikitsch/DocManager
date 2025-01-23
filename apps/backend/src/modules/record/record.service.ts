import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { IRecord, IRecordWithFileUrlResponse, Record } from './entities/records.entity';
import { ICreateRecordDto } from './dto/create-record.dto';
import { IUpdateRecordDto } from './dto/update-record.dto';
import { MinioService } from './minio.service';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import 'multer';
import { ERROR_MESSAGES, UNRECOGNIZED_FILE_EXTESION } from '~common/constants';
import { verify } from 'jsonwebtoken';
import {
  CustomJwtPayload,
  FieldsForFilterRecords,
  FieldsForSortRecords,
} from '~common/types';
import { Order, RecordStatus } from '~common/enums';
import { UserService } from '~modules/user/user.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly userService: UserService,
    private readonly minioService: MinioService
  ) {}

  async getAllRecords(options: {
    search?: string;
    filters?: FieldsForFilterRecords;
    sort: FieldsForSortRecords;
    order: Order;
    page: number;
    pageSize: number;
  }): Promise<{ data: IRecord[]; total: number }> {
    const { search, filters, sort, order, page, pageSize } = options;

    const queryBuilder = this.recordRepository.createQueryBuilder('record');

    //* Search
    if (search) {
      queryBuilder.andWhere('record.record_number ILIKE :search', {
        search: `%${search}%`,
      });
    }

    //* Filtration
    if (filters) {
      if (filters.user_id) {
        queryBuilder.andWhere('record.user_id = :user_id', {
          user_id: filters.user_id,
        });
      }

      if (filters.tax_period) {
        queryBuilder.andWhere('record.tax_period = :tax_period', {
          tax_period: filters.tax_period,
        });
      }

      if (filters.record_status) {
        queryBuilder.andWhere('record.record_status = :record_status', {
          record_status: filters.record_status,
        });
      }

      // if (filters.record_type) {
      //   queryBuilder.andWhere('record.record_type = :record_type', { record_type: filters.record_type });
      // }

      if (filters.from) {
        queryBuilder.andWhere('record.created_at >= :from', {
          from: filters.from,
        });
      }

      if (filters.to) {
        queryBuilder.andWhere('record.created_at <= :to', { to: filters.to });
      }
    }

    //* Sorting
    if (sort) {
      if (sort === 'created_at') {
        queryBuilder.orderBy('record.created_at', order);
      }

      if (sort === 'record_number') {
        queryBuilder.orderBy('record.record_number', order);
      }

      if (sort === 'record_type') {
        queryBuilder.orderBy('record.record_type', order);
      }
    }

    //* Pagination
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    //* Executing a request
    const [data, total] = await queryBuilder.getManyAndCount();

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
      throw new BadRequestException('files should not be empty')
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
    //TODO: check JwtStrategy
    const token = req.cookies?.jwt;
    if (!token) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
    }

    const { userid: user_id } = verify(
      token,
      process.env.JWT_SECRET
    ) as CustomJwtPayload;
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
