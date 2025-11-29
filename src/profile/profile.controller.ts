import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedPhotoValidated } from '../common/decorator/file.decorator';
import { CreateProfileRequest, ProfileResponse } from '../model/profile.model';
import { WebResponse } from '../model/web.model';
import { Auth } from '../common/decorator/auth.decorator';
import { UserResponse } from '../model/user.model';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('/api')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/createProfile')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBody({
    description: 'Create profile payload',
    type: CreateProfileRequest,
  })
  @ApiResponse({ status: 200, type: ProfileResponse })
  async create(
    @Auth() user: UserResponse,
    @UploadedPhotoValidated() photo: Express.Multer.File,
    @Body() request: CreateProfileRequest,
  ): Promise<WebResponse<ProfileResponse>> {
    const result = await this.profileService.create(user, request, photo);

    return {
      data: result,
    };
  }

  @Get('/getProfile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: ProfileResponse })
  async getProfile(
    @Auth() user: UserResponse,
  ): Promise<WebResponse<ProfileResponse>> {
    const result = await this.profileService.getProfile(user);

    return {
      data: result,
    };
  }

  @Put('/updateProfile')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBody({
    description: 'Update profile payload',
    type: CreateProfileRequest,
  })
  async update(
    @Auth() user: UserResponse,
    @UploadedPhotoValidated() photo: Express.Multer.File,
    @Body() request: CreateProfileRequest,
  ): Promise<WebResponse<ProfileResponse>> {
    const result = await this.profileService.update(user, request, photo);

    return {
      data: result,
    };
  }
}
