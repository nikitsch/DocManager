import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../../decorators/public.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { UserWithoutPassword } from '../../common/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.userService.create(createUserDto);
    // eslint-disable-next-line
    const { password, ...rest } = user;

    return rest;
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers(): Promise<UserWithoutPassword[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserWithoutPassword> {   
    return this.userService.getUserById(id);
  }
}
