import { LoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino/dist';
import { loggerConfig } from './logger.module';

export class CustomLoggerService implements LoggerService {
  logger: PinoLogger;

  constructor() {
    this.logger = new PinoLogger({
      pinoHttp: loggerConfig,
    });
  }

  debug(message: any, context?: string): void {
    this.logger.debug({
      msg: message,
      context,
    });
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.error({
      msg: message,
      context,
      trace,
    });
  }

  log(message: any, context?: string): any {
    this.logger.info({
      msg: message,
      context,
    });
  }

  setContext(context: string): void {
    this.logger.setContext(context);
  }

  verbose(message: any, context?: string): void {
    this.logger.trace({
      msg: message,
      context,
    });
  }

  warn(message: any, context?: string): any {
    this.logger.warn({
      msg: message,
      context,
    });
  }
}
