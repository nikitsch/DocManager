import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/records.entity';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.createRecord(createRecordDto);
  }

  @Get()
  async getAllUsers(): Promise<Record[]> {
    return this.recordService.getAllRecords();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Record> {
    return this.recordService.getRecordById(+id);
  }
}
