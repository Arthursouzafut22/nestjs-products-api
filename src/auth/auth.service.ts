import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserServiceValidate } from './testeAinda';
import { PasswordsAreNotEqualError } from './erros';

@Injectable()
export class AuthService {
  expirationToken: number;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationToken = this.configService.get<number>('JWT_EXPIRATION_TIME') as number;
  }

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new ConflictException('Esse email não está cadastrado!');
    }

    const comparePassword = await bcrypt.compare(password, user?.password as string);

    if (!comparePassword) {
      throw new PasswordsAreNotEqualError();
    }

    const payLoad = { sub: user.id, tokenExpiration: this.expirationToken };

    const token = await this.jwt.signAsync(payLoad);

    return { token: token };
  }
}
