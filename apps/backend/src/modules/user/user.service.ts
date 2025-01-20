import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../../common/constants';
import { UserWithoutPassword } from '../../common/types';

//TODO: Нужно будет сделать эндпоинт '/users' скрытым
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, organization_name } = createUserDto;

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.USERNAME_TAKEN);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      organization_name,
    });

    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      // eslint-disable-next-line
      const { password, ...rest } = user;

      return {...rest}
    });
  }

  async getUserById(id: number): Promise<UserWithoutPassword> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // eslint-disable-next-line
    const { password, ...rest } = user;

    return rest;
  }

  /**
   * Be careful, this function gives out your user password.
  */
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
