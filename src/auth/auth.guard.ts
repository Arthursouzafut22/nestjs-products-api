import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private teste: string;
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.teste = this.config.get<string>('JWT_SECRET') as string;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.validateTokenFromHeaders(request);
    console.log(token)

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payLod = await this.jwt.verifyAsync(token, { secret: this.teste });
      request['user'] = payLod;
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
