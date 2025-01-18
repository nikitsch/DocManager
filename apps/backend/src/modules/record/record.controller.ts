import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/records.entity';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ParseJsonPipe } from '../../pipes/parse-json.pipe';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createRecord(
    @Body('data', ParseJsonPipe) createRecordDto: CreateRecordDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.recordService.createRecord(createRecordDto, files);
  }

  @Get() //TODO: getRecords +filter params
  async getAllRecords(): Promise<Record[]> {
    return this.recordService.getAllRecords();
  }

  @Get(':id')
  async getRecordById(@Param('id') id: string): Promise<Record> {
    return this.recordService.getRecordById(+id);
  }

  @Patch(':id')
  async updateRecord(
    @Param('id') id: number,
    @Body() updateRecordDto: UpdateRecordDto
  ) {
    return this.recordService.updateRecord(id, updateRecordDto);
  }
}
