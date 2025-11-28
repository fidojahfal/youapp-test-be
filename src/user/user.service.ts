import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
} from '../model/user.model';
import { UserValidation } from './user.validation';
import bcrypt from 'bcrypt';
import { email } from 'zod';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private jwtService: JwtService,
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
      username: register.username,
    };
  }

  async login(request: UserLoginRequest): Promise<UserResponse> {
    const loginRequest: UserLoginRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const findUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: loginRequest.email,
          },
          {
            username: loginRequest.username,
          },
        ],
      },
    });

    if (!findUser) {
      throw new HttpException('Username/email or password is wrong!', 403);
    }

    const checkPassword = await bcrypt.compare(
      loginRequest.password,
      findUser.password,
    );

    if (!checkPassword) {
      throw new HttpException('Username/email or password is wrong!', 403);
    }

    const payload = {
      id: findUser.id,
      username: findUser.username,
    };

    return {
      ...payload,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
