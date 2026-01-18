import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/dto-user';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { UsersEmailExistsError } from './erros';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserDto): Promise<User> {
    const findEmail = await this.prisma.user.findUnique({
      where: { email: String(user.email) },
    });

    if (findEmail) {
      throw new UsersEmailExistsError();
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hash,
      },
    });
  }
}
