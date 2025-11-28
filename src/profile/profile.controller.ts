import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedPhotoValidated } from '../common/decorator/file.decorator';
import { CreateProfileRequest, ProfileResponse } from '../model/profile.model';
import { WebResponse } from '../model/web.model';
import { Auth } from '../common/decorator/auth.decorator';
import { UserResponse } from '../model/user.model';

@Controller('/api')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/createProfile')
  @UseInterceptors(FileInterceptor('photo'))
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
}
