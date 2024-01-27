import { Module, forwardRef } from '@nestjs/common';
import { TokenService } from './token.service';
import { tokenProviders } from './token.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenController } from './token.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TokenController],
  imports: [DatabaseModule, forwardRef(() => AuthModule), UserModule],
  providers: [TokenService, ...tokenProviders],
  exports: [TokenService],
})
export class TokenModule {}
