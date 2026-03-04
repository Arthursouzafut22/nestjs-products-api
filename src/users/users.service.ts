import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/dto-user';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { UsersEmailExistsError } from './erros';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private secret: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.secret = this.config.get<string>('JWT_SECRET') as string;
  }

  async create(user: UserDto): Promise<User> {
    const findEmail = await this.prisma.user.findUnique({
      where: { email: String(user.email) },
    });

    if (findEmail) {
      throw new UsersEmailExistsError();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hash,
      },
    });
  }

  async getUser(authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const payload = await this.jwt.verifyAsync<JwtPayload>(token, {
      secret: this.secret,
    });

    const { sub, name, email } = payload;

    return {
      sub,
      name,
      email,
    };
  }
}
