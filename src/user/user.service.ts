import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  async updateUser(
    id: number,
    updatedData: Partial<User>,
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updatedData);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
