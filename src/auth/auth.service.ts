import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PasswordsAreNotEqualError } from './erros';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private expirationToken: number;
  private token: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationToken = this.configService.get<number>('JWT_EXPIRATION_TIME') as number;
    this.token = this.configService.get<string>('JWT_SECRET') as string;
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

    const payLoad = { sub: user.id, tokenExpiration: this.expirationToken };

    const token = await this.jwt.signAsync(payLoad, { secret: this.token });

    return { id: payLoad.sub, token: token };
  }

  async getUser(idUser: number, token: string): Promise<AuthEntity> {
    if (!token) {
      throw new UnauthorizedException();
    }

    if (!idUser || idUser <= 0) {
      throw new BadRequestException('Invalid user id');
    }

    const findUser = await this.prisma.user.findUnique({
      where: { id: Number(idUser) },
    });

    if (!findUser) {
      throw new NotFoundException('Invalid user');
    }

    const { id, name, email } = findUser;

    const user = { id, name, email };

    return user;
  }
}
