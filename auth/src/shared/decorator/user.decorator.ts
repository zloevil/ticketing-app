import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import { ReqDto } from '../../app/common/dto/req.dto';

export const Req = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as FastifyRequest<FastifyCookieOptions>;
    return {
      body: request.body,
      params: request.params,
      query: request.query,
      id: request.id,
      token: request.cookies.jwt,
    } as ReqDto;
  },
);
