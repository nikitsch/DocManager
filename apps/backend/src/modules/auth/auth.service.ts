import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '~modules/user/user.service';
import { IUserWithoutPassword } from '~modules/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<IUserWithoutPassword | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
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
      secure: false, // Включите secure: true в продакшене
      maxAge: Number(`${process.env.JWT_LIFESPAN}000`), //milliseconds
    });

    return { message: 'Login successful' };
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
