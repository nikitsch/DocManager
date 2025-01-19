import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload } from '../common/types';
import { RecordService } from '../modules/record/record.service';
import { UserRole } from '../common/enums';

@Injectable()
export class GetRecordGuard implements CanActivate {
  constructor(private readonly recordService: RecordService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const recordId = Number(request.params.id);
    const record = await this.recordService.getRecordById(recordId);
    const token = request.cookies?.jwt;

    if (!token) {
      throw new ForbiddenException('Access denied: No token provided');
    }

    const decoded = verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

    if (decoded.role === UserRole.ADMIN) {
      return true;
    }

    if (record.user_id !== decoded.userid) {
      throw new ForbiddenException(`This user doesn't have such an record`);
    }

    return true;
  }
}
