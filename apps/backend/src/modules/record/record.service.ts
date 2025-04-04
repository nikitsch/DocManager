import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Between, ILike, LessThan, MoreThan } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_MESSAGES, UNRECOGNIZED_FILE_EXTESION } from '~common/constants';
import { UserRole } from '~common/enums';
import { JwtUserData } from '~common/types';
import { MinioService } from '~minio/minio.service';
import { UserService } from '~modules/user/user.service';
import { RecordRepository } from '~repositories/record.repository';
import { RecordTypeRepository } from '~repositories/record-type.repository';
import { ICreateRecordDto } from './dto/create-record.dto';
import { IGetRecordsDto } from './dto/get-all-record.dto';
import { IUpdateRecordDto } from './dto/update-record.dto';
import { IRecord, IRecordWithFileUrlResponse } from './entities/records.entity';
import { IRecordTypes } from './entities/record_types.entity';

import * as jwt from 'jsonwebtoken';
import * as mime from 'mime-types';
import 'multer';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly recordTypeRepository: RecordTypeRepository,
    private readonly userService: UserService,
    private readonly minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  async getAllRecords(
    request: Request,
    query: IGetRecordsDto
  ): Promise<{ data: IRecord[]; total: number }> {
    const { userid, role } = request?.user as JwtUserData;
    const { search, filters, sort, order, page, pageSize } = query;

    const where: Record<string, string | number | object> = {};

    //* Search
    if (search) {
      where.record_number = ILike(`%${search}%`);
    }

    //! We give the User (not the Admin) only our records by default
    if (role !== UserRole.ADMIN) {
      where.user_id = userid;
    }

    //* Filtration
    if (filters && Object.keys(filters)?.length) {
      const { user_id, tax_period, record_status, from, to } = filters;

      if (user_id) {
        if (role !== UserRole.ADMIN && user_id !== userid) {
          throw new BadRequestException(
            ERROR_MESSAGES.MESSAGE_AN_AUTHORSHIP_ERROR
          );
        }

        if (role === UserRole.ADMIN) {
          where.user_id = user_id;
        }
      }

      if (tax_period) {
        where.tax_period = tax_period;
      }

      if (record_status) {
        where.record_status = record_status;
      }

      // if (record_type) {
      //   where.record_type = record_type;
      // }

      if (from || to) {
        const fromDate = from ? new Date(from) : undefined;
        const toDate = to ? new Date(to) : undefined;

        if (fromDate && toDate) {
          where.created_at = Between(fromDate, toDate);
        } else if (fromDate) {
          where.created_at = MoreThan(fromDate);
        } else if (toDate) {
          where.created_at = LessThan(toDate);
        }
      }
    }

    const [data, total] = await this.recordRepository.findForTable({
      where,
      order: { [sort]: order }, //TODO: custom order for record_status
      skip: page * pageSize,
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
    return this.recordRepository.findById(id);
  }

  private async uploadFiles(files: Express.Multer.File[]) {
    if (!files?.length) {
      throw new BadRequestException('files should not be empty');
    }

    const fileData = files.map(async ({ buffer, mimetype, originalname }) => {
      const fileId = uuidv4();
      const fileExtension =
        mime.extension(mimetype) || UNRECOGNIZED_FILE_EXTESION;
      const objectName = `${fileId}.${fileExtension}`;

      // Загрузка файла в MinIO //TODO: https://docs.nestjs.com/techniques/file-upload#file-validation
      await this.minioService.uploadFile(objectName, buffer, mimetype);

      return {
        id: fileId,
        name: originalname,
        extension: fileExtension,
      };
    });

    return Promise.all(fileData);
  }

  private checkJwt(request: Request) {
    const token = request.cookies?.jwt;
    if (!token) throw new UnauthorizedException();

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    try {
      return jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private generateRecordNumber(userId: number, count: number): string {
    const today = new Date();
    return [userId, today.getDate(), today.getMonth() + 1, count + 1]
      .map((el) => String(el).padStart(2, '0'))
      .join('');
  }

  async createRecord(
    request: Request,
    crdto: ICreateRecordDto,
    files: Express.Multer.File[]
  ): Promise<IRecord> {
    const payload = this.checkJwt(request); //* We check the token manually (read in record.controller.ts @Post())
    const user_id = payload?.userid;

    const { tax_period, record_type, record_subtype, record_comment } = crdto;

    const record_type_entity = await this.recordTypeRepository.findOrCreate(
      record_type
    );

    const recordCount = await this.recordRepository.getCount();
    const record_number = this.generateRecordNumber(user_id, recordCount);

    const user = await this.userService.getUserById(user_id);
    const { organization_name } = user;

    const record_files = await this.uploadFiles(files);

    return this.recordRepository.createRecord({
      user_id,
      tax_period,
      record_type_entity,
      record_subtype,
      record_comment,
      record_number,
      organization_name,
      record_files,
    });
  }

  async updateRecord(
    id: number,
    updateRecordDto: IUpdateRecordDto
  ): Promise<IRecord> {
    const record = await this.getRecordById(id);

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

    return this.recordRepository.updateRecord(record);
  }

  async deleteRecord(id: number) {
    const record = await this.getRecordById(id);

    const fileDeletionPromises = record.record_files.map(
      ({ id, extension }) => {
        const objectName = `${id}.${extension}`;
        return this.minioService.deleteFile(objectName);
      }
    );
    await Promise.all(fileDeletionPromises);

    await this.recordRepository.deleteRecord(id);

    return { message: 'Record and associated files successfully deleted' };
  }

  async getAllRecordTypes(): Promise<IRecordTypes[]> {
    return this.recordTypeRepository.findAll();
  }
}
