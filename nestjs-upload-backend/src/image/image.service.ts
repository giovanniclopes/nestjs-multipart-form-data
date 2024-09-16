import { Injectable } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { Multer } from 'multer';

@Injectable()
export class ImageService {
  private readonly imagesDir = './uploads';

  
  async saveImage(file: Multer.File): Promise<void> {
    const filePath = join(this.imagesDir, file.originalname);
    await fsPromises.writeFile(filePath, file.buffer);
  }

  async getImages(): Promise<{ url: string; fileName: string }[]> {
    try {
      const files = await fsPromises.readdir(this.imagesDir);
      return files.map(file => ({
        url: `http://localhost:3000/images/${file}`,
        fileName: file,
      }));
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      throw new Error('Erro ao listar imagens');
    }
  }
}
