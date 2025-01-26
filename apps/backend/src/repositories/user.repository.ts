import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, User as UserEntity } from '~modules/user/entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(
    userData: Pick<IUser, 'username' | 'password' | 'organization_name'>
  ): Promise<IUser> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<IUser | undefined> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async doesUsernameExist(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !!user;
  }
}
