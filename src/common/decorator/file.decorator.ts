import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const UploadedPhotoValidated = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file) {
      return null;
    }

    const validatePhoto = (file: Express.Multer.File) => {
      if (file.size > 5 * 1024 * 1024) {
        throw new HttpException('Maximum size of photo is 5mb!', 400);
      }

      const typeAllowed: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!typeAllowed.includes(file.mimetype)) {
        throw new HttpException('Only image file allowed!', 400);
      }

      return file;
    };

    return validatePhoto(file);
  },
);
