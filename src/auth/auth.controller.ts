import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { Public, RefreshToken } from '../core/decorators/public.decorator';
import { ResponseDto } from '../dtos/response.dto';
import { generateMeta } from '../helpers/data.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }

  @RefreshToken()
  @Post('refresh')
  async refresh(@Req() req) {
    return this.authService.refreshToken(req.user);
  }

  @Get('user/profile')
  getProfile(@Req() req) {
    this.logger.debug(`user => ${req.user.username}`);
    this.logger.debug(`ngentod => ${req.ngentod}`);
    const data = this.authService.getOne(req.user);
    return new ResponseDto({ data: data });
  }

  @Get('user/all')
  getUserAll() {
    const data = this.authService.getAll();
    return new ResponseDto({
      data: data,
      meta: generateMeta(data),
    });
  }

  @Public()
  @Post('tester')
  async getTester(@Body() body: { name: string; description: string }) {
    const tes = await this.authService.postAdmin(body);
    return new ResponseDto({ message: tes });
  }
}
