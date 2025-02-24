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
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserRole } from '~common/enums';
import { Roles } from '~decorators/roles.decorator';
import { AuthorshipGuard } from '~guards/authorship.guard';
import { RecordChangeGuard } from '~guards/record-change.guard';
import { IRecord, IRecordWithFileUrlResponse } from './entities/records.entity';
import { IRecordTypes } from './entities/record_types.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { GetRecordsDto } from './dto/get-all-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordService } from './record.service';

type IRecordResponse = IRecord;
type IRecordTypesResponse = IRecordTypes;

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createRecord(
    @Req() req: Request,
    @Body() createRecordDto: CreateRecordDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<IRecordResponse> {
    return this.recordService.createRecord(req, createRecordDto, files);
  }

  @Get()
  async getRecords(
    @Req() req: Request,
    @Query() query: GetRecordsDto
  ): Promise<{ data: IRecordResponse[]; total: number }> {
    return this.recordService.getAllRecords(req, query);
  }

  @Get('types')
  async getAllRecordTypes(): Promise<IRecordTypesResponse[]> {
    return this.recordService.getAllRecordTypes();
  }

  @UseGuards(AuthorshipGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getRecordById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<IRecordWithFileUrlResponse> {
    return this.recordService.getRecordByIdWithUrls(id);
  }

  @UseGuards(AuthorshipGuard, RecordChangeGuard)
  @Patch(':id')
  async updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecordDto: UpdateRecordDto
  ): Promise<IRecordResponse> {
    return this.recordService.updateRecord(id, updateRecordDto);
  }

  @UseGuards(AuthorshipGuard, RecordChangeGuard)
  @Delete(':id')
  async deleteRecord(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.deleteRecord(id);
  }
}
