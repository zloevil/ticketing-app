import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino/dist';

export class BaseService {
  constructor(
    private extendedLogger: Logger,
  ) {}

  public throwInternalError = (msg: string, e: Error, args: any) => {
    this.extendedLogger.error({
      message: msg,
      args,
      originalErrorObject: e,
    });
    throw new InternalServerErrorException({
      message: msg,
      args,
    });
  }

  public throwNotAuthorized = (msg: string, e: Error, args: any) => {
    this.extendedLogger.error({
      message: msg,
      args,
      originalErrorObject: e,
    });
    throw new UnauthorizedException({
      message: msg,
      args,
    });
  }

  public throwBadRequestError = (msg: string, args: any) => {
    throw new BadRequestException({
      message: msg,
      args,
    });
  }

  public throwNotFoundError = (msg: string, args: any) => {
    throw new NotFoundException({
      message: msg,
      args,
    });
  }
}
