export class CreateProfileRequest {
  name: string;
  gender: string;
  birthday: string;
  height: number;
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
