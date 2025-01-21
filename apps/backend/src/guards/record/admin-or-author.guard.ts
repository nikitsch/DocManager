import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload } from '~common/types';
import { RecordService } from '~modules/record/record.service';
import { UserRole } from '~common/enums';
import { ERROR_MESSAGES } from '~common/constants';

@Injectable()
export class AdminOrAuthorGuard implements CanActivate {
  constructor(private readonly recordService: RecordService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const recordId = Number(request.params.id);
    const record = await this.recordService.getRecordById(recordId);

    //TODO: check JwtStrategy
    const token = request.cookies?.jwt;
    if (!token) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
    }

    const decoded = verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    if (decoded.role === UserRole.ADMIN) {
      return true;
    }

    if (record.user_id !== decoded.userid) {
      throw new ForbiddenException(ERROR_MESSAGES.MESSAGE_AN_AUTHORSHIP_ERROR);
    }

    return true;
  }
}
