import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ChatEventsController {
  private readonly logger = new Logger(ChatEventsController.name);

  @EventPattern('chat.message.sent')
  handleMessageSent(@Payload() data: any) {
    this.logger.log(
      `New message for user ${data.receiverId} from ${data.senderId}: ${data.content}`,
    );
  }
}
