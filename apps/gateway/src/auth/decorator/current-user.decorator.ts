/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from '../types/auth.types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const req = ctx.switchToHttp().getRequest() as any;
    return req.user as UserContext | undefined;
  },
);
