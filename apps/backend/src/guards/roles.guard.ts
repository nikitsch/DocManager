import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '~decorators/roles.decorator';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload } from '~common/types';
import { ERROR_MESSAGES } from '~common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.jwt;
    if (!token) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

      if (!roles.includes(decoded.role)) {
        throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN_RESOURCE);
      }

      return true;
    } catch {
      throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN_RESOURCE);
    }
  }
}
