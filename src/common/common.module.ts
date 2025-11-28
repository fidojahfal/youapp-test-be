import { Global, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ErrorFilter } from './filter/error.filter';
import { APP_FILTER } from '@nestjs/core';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    ValidationService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService, PrismaService],
})
export class CommonModule {}
