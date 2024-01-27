import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authSerivce: AuthService,
  ) {}

  @Post('new')
  async createUser(
    @Body() userData: { name: string; email: string; password: string },
  ) {
    try {
      const createdUser = await this.userService.createUser(userData);
      return { success: true, data: createdUser };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao criar usuário: ' + error.message,
      };
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login/')
  async login(@Request() req) {
    return this.authSerivce.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listUsers(): Promise<User[]> {
    return this.userService.listUsers();
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

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
