import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.validateTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payLod = await this.jwt.verifyAsync(token, { secret: 'JWT_SECRET' });
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
