import { Global, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [ValidationService, PrismaService],
  exports: [ValidationService, PrismaService],
})
export class CommonModule {}
