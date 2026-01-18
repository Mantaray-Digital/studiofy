import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuthenticatedRequest } from '../types/RequestTypes/UserAuthenticatedRequest';

export const UserParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<UserAuthenticatedRequest>().user;
});
