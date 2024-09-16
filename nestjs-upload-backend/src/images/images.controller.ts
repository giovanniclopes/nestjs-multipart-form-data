import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  Delete,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  @Get('list')
  getImages() {
    this.logger.log('Listando todas as imagens...');
    try {
      const directoryPath = join(process.cwd(), 'uploads');
      const files = fs.readdirSync(directoryPath);

      if (files.length === 0) {
        this.logger.warn('Nenhuma imagem encontrada na pasta.');
        return { message: 'Nenhuma imagem encontrada na pasta.' };
      }

      const fileUrls = files.map(file => ({
        fileName: file,
        url: `http://localhost:3000/images/${file}`,
      }));

      this.logger.log(`${files.length} imagens encontradas.`);
      return fileUrls;
    } catch (error) {
      this.logger.error('Erro ao listar as imagens', error.stack);
      return { message: 'Erro ao listar as imagens', error: error.message };
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = allowedTypes.test(extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (ext && mimeType) {
          cb(null, true);
        } else {
          Logger.warn(
            `Arquivo rejeitado: ${file.originalname}. Apenas JPEG, JPG e PNG são permitidos.`,
          );
          cb(new Error('Apenas arquivos JPEG, JPG e PNG são permitidos!'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Multer.File) {
    this.logger.log(`Imagem ${file.filename} enviada com sucesso.`);
    return {
      message: 'Arquivo enviado com sucesso!',
      fileName: file.filename,
      url: `http://localhost:3000/images/${file.filename}`,
    };
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    this.logger.log(`Recuperando imagem ${fileName}...`);
    return res.sendFile(fileName, { root: './uploads' });
  }

  @Delete(':fileName')
  deleteImage(@Param('fileName') fileName: string) {
    this.logger.log(`Tentando deletar o arquivo: ${fileName}...`);
    const filePath = join(process.cwd(), 'uploads', fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      this.logger.log(`Arquivo ${fileName} deletado com sucesso.`);
      return { message: `Arquivo ${fileName} deletado com sucesso!` };
    } else {
      this.logger.warn(`Arquivo ${fileName} não encontrado.`);
      return { message: 'Arquivo não encontrado!' };
    }
  }

  @Delete('all')
  deleteAllImages() {
    this.logger.log('Deletando todas as imagens...');
    try {
      const directoryPath = join(process.cwd(), 'uploads');
      const files = fs.readdirSync(directoryPath);
      files.forEach(file => {
        fs.unlinkSync(join(directoryPath, file));
      });
      this.logger.log(`${files.length} imagens deletadas.`);
      return { message: 'Todas as imagens foram deletadas com sucesso!' };
    } catch (error) {
      this.logger.error('Erro ao deletar todas as imagens', error.stack);
      return { message: 'Erro ao deletar todas as imagens', error: error.message };
    }
  }
}
