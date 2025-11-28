import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponse } from '../model/user.model';
import { SendMessageRequest } from '../model/chat.model';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    @Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy,
  ) {}

  async sendMessage(user: UserResponse, request: SendMessageRequest) {
    const message = await this.prismaService.message.create({
      data: {
        senderId: user.id,
        receiverId: request.receiverId,
        content: request.content,
      },
    });

    this.chatClient.emit('chat.message.sent', {
      id: message.id,
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      createdAt: message.createdAt,
    });

    return message;
  }

  async getMessages(user: UserResponse, anotherUserId: string) {
    return this.prismaService.message.findMany({
      where: {
        OR: [
          { senderId: user.id, receiverId: anotherUserId },
          { senderId: anotherUserId, receiverId: user.id },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
