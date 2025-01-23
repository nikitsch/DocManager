import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '~common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, IUserWithoutPassword, User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const { username, password, organization_name } = createUserDto;

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.USERNAME_TAKEN);
    }

    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      organization_name,
    });

    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<IUserWithoutPassword[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      // eslint-disable-next-line
      const { password, ...rest } = user;

      return { ...rest };
    });
  }

  async getUserById(id: number): Promise<IUserWithoutPassword> {
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
  async findByUsername(username: string): Promise<IUser | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
