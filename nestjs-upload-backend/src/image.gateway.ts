// src/image.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ImageService } from './image/image.service';

@WebSocketGateway()
export class ImageGateway {
  constructor(private readonly imageService: ImageService) { }

  @SubscribeMessage('imageUpdated')
  handleImageUpdate(@MessageBody() data: any): void {
    console.log('Notificando usuários sobre a atualização de imagem');
  }
}
