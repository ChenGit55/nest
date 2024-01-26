import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DeleteResult, UpdateResult } from 'typeorm';

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

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updatedData: Partial<User>,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, updatedData);
  }

  @Delete('del/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
