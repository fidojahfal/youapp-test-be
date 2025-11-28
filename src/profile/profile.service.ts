import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import {
  CreateProfileRequest,
  Profile,
  ProfileResponse,
} from '../model/profile.model';
import { ProfileValidation } from './profile.validation';
import { promises as fs } from 'fs';
import {
  getHoroscope,
  getZodiac,
} from '../common/helper/zodiac-horoscope.helper';
import { UserResponse } from '../model/user.model';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  private calculateAge(birthday: string): number {
    const today = new Date();
    const birth = new Date(birthday);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  private toProfileJson(profile): Profile | null {
    const profileJson = profile as Prisma.JsonObject | null;

    const responseProfile: Profile | null = profileJson
      ? {
          name: profileJson.name as string,
          gender: profileJson.gender as string,
          age: profileJson.age as number,
          birthday: profileJson.birthday as string,
          height: profileJson.height as number,
          weight: profileJson.weight as number,
          horoscope: profileJson.horoscope as string,
          zodiac: profileJson.zodiac as string,
          photo: (profileJson.photo as string) ?? null,
        }
      : null;

    return responseProfile;
  }

  async create(
    user: UserResponse,
    request: CreateProfileRequest,
    photo: Express.Multer.File,
  ): Promise<ProfileResponse> {
    const profileRequest = this.validationService.validate(
      ProfileValidation.CREATE,
      request,
    );

    const findProfile = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (Object.keys(findProfile?.profile ?? {}).length > 0) {
      if (photo) {
        await fs.unlink(photo.path);
      }
      throw new HttpException('Profile already created!', 400);
    }

    const age = this.calculateAge(profileRequest.birthday);
    const horoscope = getHoroscope(profileRequest.birthday);
    const zodiac = getZodiac(profileRequest.birthday);
    const photoName: string = photo?.filename ?? '';

    const profile = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile: {
          ...profileRequest,
          age,
          horoscope,
          zodiac,
          photo: photoName,
        },
      },
    });

    if (!profile) {
      if (photo) {
        await fs.unlink(photo.path);
      }
      throw new HttpException('failed to save data!', 500);
    }

    return {
      id: profile.id,
      username: profile.username,
      profile: this.toProfileJson(profile.profile),
    };
  }

  async getProfile(user: UserResponse): Promise<ProfileResponse> {
    const profile = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!profile) {
      throw new HttpException('User profile not found!', 404);
    }

    return {
      id: profile.id,
      username: profile.username,
      profile: this.toProfileJson(profile?.profile),
    };
  }

  async update(
    user: UserResponse,
    request: CreateProfileRequest,
    photo: Express.Multer.File,
  ): Promise<ProfileResponse> {
    const profileRequest = this.validationService.validate(
      ProfileValidation.UPDATE,
      request,
    );

    const age = this.calculateAge(profileRequest.birthday);
    const horoscope = getHoroscope(profileRequest.birthday);
    const zodiac = getZodiac(profileRequest.birthday);
    const photoName: string = photo?.filename ?? '';

    const profile = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile: {
          ...profileRequest,
          age,
          horoscope,
          zodiac,
          photo: photoName,
        },
      },
    });

    if (!profile) {
      if (photo) {
        await fs.unlink(photo.path);
      }
      throw new HttpException('failed to save data!', 500);
    }

    return {
      id: profile.id,
      username: profile.username,
      profile: this.toProfileJson(profile.profile),
    };
  }
}
