import { WsException } from '@nestjs/websockets';
import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
@Catch()
export class WebsocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    socket.emit('exception', {
      status: 'error',
      message: 'ws message is valid',
    });
  }
}
