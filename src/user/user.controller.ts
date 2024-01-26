import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async list(): Promise<User[]> {
    return this.userService.list();
  }

  @Get('list2')
  findAll(): Promise<User[]> {
    return this.userService.list();
  }

  @Get(':id')
  async selectUser(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.selectUser(id);
  }

  @Delete('del/:id')
  async remove(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
