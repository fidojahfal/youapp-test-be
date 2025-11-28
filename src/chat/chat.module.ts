import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatEventsController } from './chat.events';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'chat_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController, ChatEventsController],
})
export class ChatModule {}
