import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'picture'),
        filename: (req, file, cb) => {
          const filename: string = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
