import { ApiProperty } from '@nestjs/swagger';

export class SendMessageRequest {
  @ApiProperty({ example: '' })
  receiverId: string;

  @ApiProperty({ example: 'Tes message' })
  content: string;
}
