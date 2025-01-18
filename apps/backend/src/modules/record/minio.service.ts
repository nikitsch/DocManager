import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: Number(process.env.MINIO_PORT_ONE),
      useSSL: false,
      accessKey: process.env.MINIO_USER,
      secretKey: process.env.MINIO_PASSWORD,
    });
  }

  async uploadFile(
    objectName: string,
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<string> {
    const bucketName = process.env.MINIO_FILES_BUCKET_NAME;
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
    return this.minioClient.presignedUrl(
      'GET',
      process.env.MINIO_FILES_BUCKET_NAME,
      objectName,
      Number(process.env.MINIO_URL_LIFESPAN),
      {
        'response-content-disposition': `attachment; filename="${originalName}"`,
      }
    );
  }
}
