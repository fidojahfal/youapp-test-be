import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterRequest {
  @ApiProperty({ example: 'test1@test.com' })
  email: string;

  @ApiProperty({ example: 'testuser1', description: 'unique username' })
  username: string;

  @ApiProperty({ example: 'testes123', minLength: 8 })
  password: string;

  @ApiProperty({ example: 'testes123', minLength: 8 })
  confirm_password: string;
}

export class UserLoginRequest {
  @ApiProperty({ example: 'test1@test.com' })
  email?: string;

  @ApiProperty({ example: 'testuser1', description: 'unique username' })
  username?: string;

  @ApiProperty({ example: 'testes123', minLength: 8 })
  password: string;
}

export class UserResponse {
  id: string;
  username: string;
  token?: string;
}
