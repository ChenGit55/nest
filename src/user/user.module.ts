import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
