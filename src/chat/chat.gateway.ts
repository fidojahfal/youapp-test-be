import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected', client.id);
  }

  notifyNewMessage(data: {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
  }) {
    this.server.emit('chat:newMessage', data);
  }
}
