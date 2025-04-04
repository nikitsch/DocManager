import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from '~decorators/public.decorator';
import { RolesGuard } from '~guards/roles.guard';
import { Roles } from '~decorators/roles.decorator';
import { UserRole } from '~common/enums';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserWithoutPassword } from './entity/user.entity';

type IUserResponse = IUserWithoutPassword;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers(): Promise<IUserResponse[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<IUserResponse> {
    return this.userService.getUserById(id);
  }
}
