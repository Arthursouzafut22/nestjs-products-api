import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PasswordsAreNotEqualError } from './erros';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private expirationToken: number;
  private secret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationToken = this.configService.get<number>('JWT_EXPIRATION_TIME') as number;
    this.secret = this.configService.get<string>('JWT_SECRET') as string;
  }

  async signIn(email: string, password: string): Promise<{ id: number; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new ConflictException('Email ou senha inválidos');
    }

    const comparePassword = await bcrypt.compare(password, user?.password as string);

    if (!comparePassword) {
      throw new PasswordsAreNotEqualError();
    }

    const payLoad = {
      sub: user.id,
      email: user.email,
      name: user.name,
      tokenExpiration: this.expirationToken,
    };

    const token = await this.jwt.signAsync(payLoad, { secret: this.secret });

    return { id: payLoad.sub, token: token };
  }
}
