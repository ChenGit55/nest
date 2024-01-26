import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.find();
  }

  async selectUser(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
}
