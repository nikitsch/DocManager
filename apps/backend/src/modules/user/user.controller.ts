import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    // eslint-disable-next-line
    const { password, ...result } = user;

    return result;
  }

  // @Get()
  // async getAllUsers(): Promise<User[]> {
  //   return this.userService.getAllUsers();
  // }

  // @Get(':id')
  // async getUserById(@Param('id') id: string): Promise<User> {
  //   return this.userService.getUserById(+id);
  // }
}
