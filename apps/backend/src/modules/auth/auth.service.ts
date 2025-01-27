import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtUserData } from '~common/types';
import { UserService } from '~modules/user/user.service';
import { IUserWithoutPassword } from '~modules/user/entity/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<IUserWithoutPassword | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(
    user: IUserWithoutPassword,
    response: Response
  ): Promise<JwtUserData> {
    const { user_id: userid, username, role } = user;
    const payload = { userid, username, role };
    const token = this.jwtService.sign(payload);
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Включить secure: true в продакшене
      maxAge: this.configService.get<number>('JWT_MAX_AGE_IN_COOKIE'), //* in milliseconds
    });

    return payload;
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
