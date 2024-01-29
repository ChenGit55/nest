import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.tokenService.saveToken(token, user.email);
    return {
      access_token: token,
    };
  }

  async tokenLogin(token: string) {
    let user: User = await this.tokenService.getUserByToken(token);
    if (user) {
      return this.login(user);
    } else {
      new HttpException(
        {
          error: 'INVALID TOKEN!!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
