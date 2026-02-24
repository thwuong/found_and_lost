import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadType } from '../strategies/types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayloadType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
