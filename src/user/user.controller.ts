import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterRequest, UserResponse } from '../model/user.model';
import { WebResponse } from '../model/web.model';

@Controller('/api')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() request: UserRegisterRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);

    return {
      data: result,
    };
  }
}
