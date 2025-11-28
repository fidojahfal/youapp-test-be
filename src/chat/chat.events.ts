import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ChatGateway } from './chat.gateway';

@Controller()
export class ChatEventsController {
  private readonly logger = new Logger(ChatEventsController.name);

  constructor(private chatGateaway: ChatGateway) {}

  @EventPattern('chat.message.sent')
  handleMessageSent(@Payload() data: any) {
    this.logger.log(
      `New message for user ${data.receiverId} from ${data.senderId}: ${data.content}`,
    );

    this.chatGateaway.notifyNewMessage(data);
  }
}
