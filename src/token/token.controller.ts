import { Body, Controller, Put } from '@nestjs/common';
import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
