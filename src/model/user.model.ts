export class UserRegisterRequest {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export class UserLoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export class UserResponse {
  id: string;
  username: string;
  token?: string;
}
