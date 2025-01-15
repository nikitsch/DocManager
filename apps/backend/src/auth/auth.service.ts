import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from '../types';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserWithoutPassword, response: Response) {
    const payload = {
      username: user.username,
      sub: user.user_id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Включите secure: true в продакшене
      maxAge: 3600000, // 1 час
    });

    return { message: 'Login successful' };
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
