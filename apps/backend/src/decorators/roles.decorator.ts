import { SetMetadata } from '@nestjs/common';
import { UserRole } from '~common/enums';

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
