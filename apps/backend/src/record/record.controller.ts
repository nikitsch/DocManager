import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/records.entity';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdateRecordStatusDto } from './dto/update-record-status.dto copy';

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

  @Patch(':id')
  async updateRecord(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordService.updateRecord(id, updateRecordDto);
  }

  @Patch('status/:id')
  async updateRecordStatus(@Param('id') id: number, @Body() updateRecordStatusDto: UpdateRecordStatusDto) {
    return this.recordService.updateRecordStatus(id, updateRecordStatusDto);
  }
}
