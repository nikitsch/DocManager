import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '~modules/user/user.service';
import { IUser, IUserWithoutPassword } from '~modules/user/entity/user.entity';

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
    const user = (await this.userService.findByUsername(
      username,
      true
    )) as IUser;
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: IUserWithoutPassword, response: Response) {
    const payload = {
      userid: user.user_id,
      username: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Включить secure: true в продакшене
      maxAge: this.configService.get<number>('JWT_MAX_AGE_IN_COOKIE'), //* in milliseconds
    });

    return { message: 'Login successful' };
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
