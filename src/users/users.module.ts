import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllers } from './users.controller';
// import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  // imports: [PrismaModule],
  controllers: [UsersControllers],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
