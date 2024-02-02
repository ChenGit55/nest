import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const emailCheck = await this.userRepository.findOneBy({
        email: userData.email,
      });
      if (!emailCheck) {
        const user = this.userRepository.create(userData);
        user.password = await bcrypt.hash(userData.password, 8);
        console.log('- User creation success!');
        return this.userRepository.save(user);
      } else {
        console.log('Email already takken.');
        throw 'Email already takken.';
      }
    } catch (error) {
      console.log(error, '- Failed to create user!');
      throw error;
    }
  }

  async listUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async selectUser(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async updateUser(
    id: number,
    updatedData: Partial<User>,
  ): Promise<UpdateResult> {
    try {
      if (updatedData.password) {
        updatedData.password = await bcrypt.hash(updatedData.password, 8);
      }
      console.log('User updated succes!');
      return this.userRepository.update(id, updatedData);
    } catch (error) {
      console.log('Failed to update user!');
      throw error;
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }
}
