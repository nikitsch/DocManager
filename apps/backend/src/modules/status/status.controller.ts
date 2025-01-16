import { Controller, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateRecordStatusDto } from './dto/update-record-status.dto';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateRecordStatus(
    @Param('id') id: number,
    @Body() updateRecordStatusDto: UpdateRecordStatusDto
  ) {
    return this.statusService.updateRecordStatus(id, updateRecordStatusDto); //TODO: Возвращать 200-ый код вместо всего объекта
  }
}
