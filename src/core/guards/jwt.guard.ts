import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import {
  IS_PUBLIC_KEY,
  IS_REFRESH_TOKEN,
} from '../decorators/public.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  private logger = new Logger(JwtGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.verbose('canActivate()');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isRefreshToken = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    } else {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const secret = this.configService.get<string>(
          isRefreshToken ? 'JWT_KEY_REFRESH' : 'JWT_KEY',
        );
        request['user'] = await this.jwtService.verifyAsync(token, {
          secret: secret,
        });
        request['ngentod'] = ` ${request['user'].username} hehehe`;

        return true;
      } catch {
        throw new UnauthorizedException('Token invalid or expired');
      }
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
