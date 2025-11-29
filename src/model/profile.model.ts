import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileRequest {
  @ApiProperty({ example: 'User 1' })
  name: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  @ApiProperty({
    example: new Date('05-10-2000').toISOString(),
    description: 'Format MM-DD-YYYY',
  })
  birthday: string;

  @ApiProperty({ example: 179 })
  height: number;

  @ApiProperty({ example: 70 })
  weight: number;
}

export class UpdateProfileRequest {
  @ApiProperty({ example: 'User 1' })
  name: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  @ApiProperty({
    example: new Date('05-10-2000').toISOString(),
    description: 'Format MM-DD-YYYY',
  })
  birthday: string;

  @ApiProperty({ example: 179 })
  height: number;

  @ApiProperty({ example: 70 })
  weight: number;
}

export class ProfileResponse {
  id: string;
  username: string;
  profile: Profile | null;
}

export interface Profile {
  name: string;
  gender: string;
  age: number;
  birthday: string;
  height: number;
  weight: number;
  horoscope: string;
  zodiac: string;
  photo: string | null;
}
