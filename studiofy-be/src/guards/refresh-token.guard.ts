import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const body = request.body as Record<string, unknown> | undefined;
    const cookies = request.cookies as Record<string, unknown> | undefined;
    const headers = request.headers;

    let token: string | undefined;

    if (typeof body?.refreshToken === 'string') {
      token = body.refreshToken;
    } else if (typeof headers['authorization'] === 'string') {
      token = headers['authorization'].replace(/^Bearer\s+/i, '');
    } else if (typeof cookies?.refreshToken === 'string') {
      token = cookies.refreshToken;
    }

    // 2. Check if token is missing OR if it is the unresolved Postman placeholder
    if (!token || token === '{{refreshToken}}') {
      throw new UnauthorizedException('Refresh token is missing or invalid');
    }

    // Attach token safely
    (request as Request & { refreshToken: string }).refreshToken = token;

    return true;
  }
}
