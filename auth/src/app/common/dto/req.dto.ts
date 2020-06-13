import { DefaultParams, DefaultQuery } from 'fastify';
import { JwtPayloadDto } from './jwt-payload.dto';

export class ReqDto<T = any, E = DefaultParams, R = DefaultQuery> {
  body: T;

  params: E;

  query: R;

  id: number;

  token?: string;

  user?: JwtPayloadDto;
}
