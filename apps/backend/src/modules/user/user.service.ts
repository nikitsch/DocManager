import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '~common/constants';
import { UserRepository } from '~repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, IUserWithoutPassword } from './entity/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {}

  private passwordExtractor(user: IUser[]): IUserWithoutPassword[] {
    // eslint-disable-next-line
    return user.map(({ password, ...rest }) => rest);
  }

  async create(createUserDto: CreateUserDto): Promise<IUserWithoutPassword> {
    const { username, password, organization_name } = createUserDto;

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException(ERROR_MESSAGES.USERNAME_TAKEN);
    }

    const salt = this.configService.get<string>('BCRYPT_SALT');
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.userRepository.createUser({
      username,
      password: hashedPassword,
      organization_name,
    });

    const [res] = this.passwordExtractor([newUser]); //TODO: ref
    return res;
  }

  async getAllUsers(): Promise<IUserWithoutPassword[]> {
    const users = await this.userRepository.findAll();
    return this.passwordExtractor(users);
  }

  async getUserById(id: number): Promise<IUserWithoutPassword | undefined> {
    const user = await this.userRepository.findById(id);
    const [res] = this.passwordExtractor([user]); //TODO: ref
    return res;
  }

  /**
   * Be careful, this function may reveal the user's password!
   */
  async findByUsername(
    username: string,
    withPassword = false
  ): Promise<IUser | IUserWithoutPassword | undefined> {
    //TODO: ref IUser | IUserWithoutPassword
    const user = await this.userRepository.findByUsername(username);
    if (withPassword) {
      return user;
    }

    const [res] = this.passwordExtractor([user]); //TODO: ref
    return res;
  }
}
