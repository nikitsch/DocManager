import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERROR_MESSAGES } from '~common/constants';
import { ROLES_KEY } from '~decorators/roles.decorator';
import { RecordService } from '~modules/record/record.service';

@Injectable()
export class AuthorshipGuard implements CanActivate {
  constructor(
    private readonly recordService: RecordService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const recordId = Number(request.params.id);
    const record = await this.recordService.getRecordById(recordId);

    if (roles?.includes(request?.user?.role)) {
      return true;
    }

    if (record.user_id !== request?.user?.userid) {
      throw new ForbiddenException(ERROR_MESSAGES.MESSAGE_AN_AUTHORSHIP_ERROR);
    }

    return true;
  }
}
