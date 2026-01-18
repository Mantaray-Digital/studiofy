// src/config/file-upload.config.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';

export const imageUploadOptions: MulterModuleOptions = {
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new HttpException(`Unsupported file type ${file.mimetype}. Only jpg, jpeg, png and webp are allowed.`, HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max
  },
};
