import { Controller, Body, Param, Patch } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateRecordStatusDto } from './dto/update-record-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Patch(':id')
  async updateRecordStatus(
    @Param('id') id: number,
    @Body() updateRecordStatusDto: UpdateRecordStatusDto
  ) {
    return this.statusService.updateRecordStatus(id, updateRecordStatusDto); //TODO: Возвращать 200-ый код вместо всего объекта
  }
}
