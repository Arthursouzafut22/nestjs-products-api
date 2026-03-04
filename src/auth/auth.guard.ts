import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private secret: string;
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.secret = this.config.get<string>('JWT_SECRET') as string;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.validateTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payLod = await this.jwt.verifyAsync<JwtPayload>(token, { secret: this.secret });
      request.user = {
        id: payLod.sub,
        name: payLod.name,
        email: payLod.email,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private validateTokenFromHeaders(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
