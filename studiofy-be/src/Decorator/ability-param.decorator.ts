import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AbilityRequest } from '../types/RequestTypes/AbilityRequest';

export const AbilityParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<AbilityRequest>().ability;
});
