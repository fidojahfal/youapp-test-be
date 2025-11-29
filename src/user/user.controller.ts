import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
} from '../model/user.model';
import { WebResponse } from '../model/web.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 200, type: WebResponse })
  async register(
    @Body() request: UserRegisterRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: WebResponse })
  async login(
    @Body() request: UserLoginRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);

    return {
      data: result,
    };
  }
}
