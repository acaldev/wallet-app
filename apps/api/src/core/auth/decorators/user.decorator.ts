import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { UsernameResponse } from 'src/core';
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const bearerToken = request.get('Authorization');
    const token = bearerToken.replace('Bearer ', '');
    const { username } = decode(token) as UsernameResponse;
    return username;
  }
);
