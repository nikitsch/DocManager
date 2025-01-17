import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from './minio.service';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';
import 'multer';
import { UNRECOGNIZED_FILE_EXTESION } from '../../common/constants';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly minioService: MinioService
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    const fileData = await Promise.all(
      files.map(async ({ buffer, mimetype, originalname }) => {
        const fileId = uuidv4();
        const fileExtension =
          mime.extension(mimetype) || UNRECOGNIZED_FILE_EXTESION;
        const objectName = `${fileId}.${fileExtension}`;

        // Загрузка файла в MinIO
        await this.minioService.uploadFile(objectName, buffer, mimetype);

        return {
          id: fileId,
          name: originalname,
          extension: fileExtension,
        };
      })
    );

    const newFileEntity = this.fileRepository.create({ files: fileData });
    await this.fileRepository.save(newFileEntity);

    return fileData;
  }

  async getFilesById(id: number) {
    const fileEntity = await this.fileRepository.findOne({ where: { id } });

    if (!fileEntity) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    const filesWithUrls = await Promise.all(
      fileEntity.files.map(async ({ id, extension, name }) => {
        const objectName = `${id}.${extension}`;
        const url = await this.minioService.generatePresignedUrl(
          objectName,
          name
        );

        return { url, name, extension };
      })
    );

    return filesWithUrls;
  }
}
