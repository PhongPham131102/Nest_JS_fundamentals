import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { WebsocketExceptionFilter } from './ws-exception.filter';
import { Socket, Server } from 'socket.io';
class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateWay {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {
    this.server.emit('text-chat', {
      ...message,
      time: new Date().toLocaleString(),
    });
  }
}
