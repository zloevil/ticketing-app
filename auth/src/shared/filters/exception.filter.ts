import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as FastifyReply<FastifyCookieOptions>;
    const request = ctx.getRequest() as FastifyRequest<FastifyCookieOptions>;
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException
      ? (exception.getResponse() as HttpException).message
      : exception.message;

    response.code(status).send({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      id: request.id,
    });
  }
}
