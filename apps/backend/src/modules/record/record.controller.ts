import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  ParseIntPipe,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/records.entity';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminOrAuthorGuard } from '../../guards/record/admin-or-author.guard';
import { AuthorshipGuard } from '../../guards/record/authorship.guard';
import {
  FieldsForFilterRecords,
  FieldsForSortRecords,
  RecordWithUrls,
} from '../../common/types';
import { Order } from '../../common/enums';
import { ParseRecordDataPipe } from '../../pipes/parse-record-data.pipe';
import { ParseRecordFilterPipe } from '../../pipes/parse-record-filter.pipe';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createRecord(
    @Req() req: Request,
    @Body('data', ParseRecordDataPipe) createRecordDto: CreateRecordDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.recordService.createRecord(req, createRecordDto, files);
  }

  @Get()
  async getAllRecords(
    @Query('search') search?: string,
    @Query('filters', ParseRecordFilterPipe) filters?: FieldsForFilterRecords,
    @Query('sort') sort: FieldsForSortRecords = 'created_at',
    @Query('order') order = Order.ASC,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10
  ): Promise<{ data: Record[]; total: number }> {
    return this.recordService.getAllRecords({
      search,
      filters,
      sort,
      order,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @UseGuards(AdminOrAuthorGuard)
  @Get(':id')
  async getRecordById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<RecordWithUrls> {
    return this.recordService.getRecordByIdWithUrls(id);
  }

  @UseGuards(AuthorshipGuard)
  @Patch(':id')
  async updateRecord(
    @Param('id') id: number,
    @Body() updateRecordDto: UpdateRecordDto
  ) {
    return this.recordService.updateRecord(id, updateRecordDto);
  }
}
