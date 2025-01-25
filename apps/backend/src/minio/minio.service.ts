import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('MINIO_PORT_ONE'),
      useSSL: this.configService.get<boolean>('MINIO_USE_SSL'),
      accessKey: this.configService.get<string>('MINIO_USER'),
      secretKey: this.configService.get<string>('MINIO_PASSWORD'),
    });
  }

  async uploadFile(
    objectName: string,
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<string> {
    const bucketName = this.configService.get<string>(
      'MINIO_FILES_BUCKET_NAME'
    );
    const fileSize = fileBuffer.length;

    await this.minioClient.putObject(
      bucketName,
      objectName,
      fileBuffer,
      fileSize,
      {
        'Content-Type': mimeType,
      }
    );

    return `${bucketName}/${objectName}`;
  }

  async generatePresignedUrl(
    objectName: string,
    originalName: string
  ): Promise<string> {
    const bucketName = this.configService.get<string>(
      'MINIO_FILES_BUCKET_NAME'
    );
    const expires = this.configService.get<number>('MINIO_URL_LIFESPAN');

    return this.minioClient.presignedUrl(
      'GET',
      bucketName,
      objectName,
      expires,
      {
        'response-content-disposition': `attachment; filename="${originalName}"`,
      }
    );
  }
}
