import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

export const loggerConfig = {
  name: process.env.SERVICE_NAME,
  formatters: {
    level: (level) => ({ level }),
  },
  level: process.env.NODE_ENV !== 'production' ? 'trace' : 'error',
  prettyPrint: process.env.NODE_ENV !== 'production',
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: loggerConfig,
    }),
  ],
  providers: [],
})
export class LoggerInitModule {}
