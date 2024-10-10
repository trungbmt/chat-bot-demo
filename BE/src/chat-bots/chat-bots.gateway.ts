import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
@WebSocketGateway(3001, { cors: true })
export class ChatBotGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor() {}
  handleDisconnect(client: any) {
    console.log('client disconnected ' + client?.id);
  }
  afterInit(server: any): any {
    console.log('Init');
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  async handleConnection(client: Socket) {
    console.log('client connect ' + client?.id);
  }
}
