export class UserRegisterRequest {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export class UserResponse {
  id: string;
  email: string;
  username: string;
  token?: string;
}
