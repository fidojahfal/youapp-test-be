import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test123',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        id: '65df209bd2c7a3f17b67dd01',
        email: 'test123@test.com',
        username: 'test123',
        password:
          '$2a$13$n4Rw6s9DO3jOfEOlY1EVzOMMBrvJXmoIVkmuuVZwzN94I8VUS1XwS',
        profile: {},
      },
    });
  }
}
