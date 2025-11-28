import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { UserRegisterRequest, UserResponse } from '../model/user.model';
import { UserValidation } from './user.validation';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async register(request: UserRegisterRequest): Promise<UserResponse> {
    const registerRequest: UserRegisterRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const checkUsernameOrEmail = await this.prismaService.user.count({
      where: {
        OR: [
          {
            email: registerRequest.email,
          },
          {
            username: registerRequest.username,
          },
        ],
      },
    });

    if (checkUsernameOrEmail > 0) {
      throw new HttpException('Username or email already exists!', 401);
    }

    if (registerRequest.confirm_password != registerRequest.password) {
      throw new HttpException('Make sure the password is same!', 401);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 13);

    const register = await this.prismaService.user.create({
      data: {
        username: registerRequest.username,
        email: registerRequest.email,
        password: registerRequest.password,
        profile: {},
      },
    });

    return {
      id: register.id,
      email: register.email,
      username: register.username,
    };
  }
}
