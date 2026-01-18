import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshTokenRequest } from 'src/types/RefreshTokenRequest';

export const RefreshToken = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<RefreshTokenRequest>();

  if (!request.refreshToken) {
    throw new BadRequestException('Refresh token not found in request');
  }
  return request.refreshToken;
});
