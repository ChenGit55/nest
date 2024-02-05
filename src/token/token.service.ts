import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(user: string, hash: string) {
    let tokenObj = await this.tokenRepository.findOneBy({ user });

    if (tokenObj) {
      this.tokenRepository.update(tokenObj.id, {
        hash: hash,
      });
    } else {
      this.tokenRepository.insert({
        user: user,
        hash: hash,
      });
    }
  }

  async refreshToken(oldToken: string) {
    if (!oldToken) {
      throw new BadRequestException('Token is needed');
    }
    let tokenObj = await this.tokenRepository.findOneBy({ hash: oldToken });
    if (tokenObj) {
      let userToken = await this.userService.findOne(tokenObj.user);
      return this.authService.login(userToken);
    } else {
      throw new HttpException(
        {
          error: 'INVALID TOKEN!!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUserByToken(token: string): Promise<User> {
    token = token.replace('Bearer ', '').trim();
    let TokenObj: Token = await this.tokenRepository.findOneBy({ hash: token });
    if (TokenObj) {
      let user = await this.userService.findOne(TokenObj.user);
      return user;
    } else {
      return null;
    }
  }
}
