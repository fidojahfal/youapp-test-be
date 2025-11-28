import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}
}
