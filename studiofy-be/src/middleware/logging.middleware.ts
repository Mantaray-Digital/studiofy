import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const requestTime = new Date().getTime();
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = new Date().getTime();
      this.logger.log(`${method} {${originalUrl}} {${ip}} ${userAgent} ${statusCode} ${responseTime - requestTime} ms`);
    });

    next();
  }
}
