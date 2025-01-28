import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '~common/constants';
import { RecordStatus } from '~common/enums';
import { RecordService } from '~modules/record/record.service';

@Injectable()
export class RecordChangeGuard implements CanActivate {
  constructor(private readonly recordService: RecordService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const recordId = Number(request.params.id);
    const record = await this.recordService.getRecordById(recordId);

    if (record.record_status !== RecordStatus.NEW) {
      throw new BadRequestException(ERROR_MESSAGES.STATUS_DOESNT_ALLOW_CHANGES);
    }

    return true;
  }
}
