import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '~guards/local-auth.guard';
import { Public } from '~decorators/public.decorator';
import { IUserWithoutPassword } from '~modules/user/entity/user.entity';
import { AuthService } from './auth.service';
import { JwtUserData } from '~common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<JwtUserData> {
    return this.authService.login(
      request.user as IUserWithoutPassword,
      response
    );
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response
  ): Promise<{ message: string }> {
    return this.authService.logout(response);
  }

  @Get('check')
  async checkAuth(): Promise<boolean> {
    return true; //* If the user is not authorized, JwtAuthGuard sends an authorization error. Otherwise, return true
  }
}
