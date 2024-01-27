import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
