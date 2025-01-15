import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

//! Check
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies?.jwt;

    return Boolean(jwt); //TODO: we do not check the correctness of the token
  }
}

// if (!jwt) {
//   throw new UnauthorizedException('No token provided');
// }

// try {
//   // Проверяем токен с помощью JwtService
//   const payload = this.jwtService.verify(jwt);
//   request.user = payload; // Добавляем данные пользователя в запрос
//   return true;
// } catch (error) {
//   throw new UnauthorizedException('Invalid or expired token');
// }
