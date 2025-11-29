import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from '../common/decorator/auth.decorator';
import { UserResponse } from '../model/user.model';
import { SendMessageRequest } from '../model/chat.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('/api')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/sendMessage')
  @ApiOperation({ summary: 'Send chat message to another user' })
  @ApiResponse({ status: 200 })
  sendMessage(@Auth() user: UserResponse, @Body() request: SendMessageRequest) {
    return this.chatService.sendMessage(user, request);
  }

  @Get('/viewMessage')
  @ApiOperation({ summary: 'View messages with another user' })
  @ApiResponse({ status: 200 })
  viewMessage(
    @Auth() user: UserResponse,
    @Query('userId') anotherUserId: string,
  ) {
    return this.chatService.getMessages(user, anotherUserId);
  }
}
