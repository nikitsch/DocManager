import { Controller, Post, Res, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res() res) {
    return this.authService.login(req.user, res);
  }

  @Post('logout')
  async logout(@Res() res) {
    return this.authService.logout(res);
  }
}
