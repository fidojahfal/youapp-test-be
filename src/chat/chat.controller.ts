import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from '../common/decorator/auth.decorator';
import { UserResponse } from '../model/user.model';
import { SendMessageRequest } from '../model/chat.model';

@Controller('/api')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Post('/sendMessage')
  sendMessage(@Auth() user: UserResponse, @Body() request: SendMessageRequest) {
    return this.chatService.sendMessage(user, request);
  }
}
