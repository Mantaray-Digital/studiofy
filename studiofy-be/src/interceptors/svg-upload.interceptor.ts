import { BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

/**
 * Reusable SVG upload interceptor
 * @param fieldName - field name in form-data
 * @param options - { multiple?: boolean, maxCount?: number }
 */
export function SvgUploadInterceptor(fieldName = 'file', options?: { multiple?: boolean; maxCount?: number }) {
  const { multiple = false, maxCount = 10 } = options || {};

  const interceptor = multiple
    ? FilesInterceptor(fieldName, maxCount, {
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
        fileFilter: svgFileFilter,
      })
    : FileInterceptor(fieldName, {
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
        fileFilter: svgFileFilter,
      });

  return interceptor;
}

// shared file filter for single & multiple
function svgFileFilter(req: any, file: Express.Multer.File, cb: Function) {
  const allowedMime = 'image/svg+xml';
  const isMimeOk = file.mimetype === allowedMime;
  const isExtOk = extname(file.originalname).toLowerCase() === '.svg';

  if (isMimeOk && isExtOk) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Only SVG files up to 5MB are allowed'), false);
  }
}
