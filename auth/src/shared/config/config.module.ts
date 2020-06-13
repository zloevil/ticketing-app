import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule as Config } from '@nestjs/config';


// these environment variables need to be set only if necessary to rewrite their value
@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'e2e' ? '.e2e.env' : '.env',
      validationSchema: Joi.object({
        // common
        SERVICE_NAME: Joi.string()
          .default('AUTH_SERVICE'),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'e2e')
          .default('development'),
        PORT: Joi.string().default(8080),
        JWT_SECRET: Joi.string()
          .default('zloevil'),
        COOKIE_SECRET: Joi.string()
          .default('zloject'),
        // connections
        // postgres
        DB_HOST: Joi.string()
          .default('auth-db-srv'),
        DB_PORT: Joi.number()
          .default(5432),
        DB_USERNAME: Joi.string()
          .default('root'),
        DB_PASSWORD: Joi.string()
          .default('root'),
        DB_NAME: Joi.string()
          .default('auth'),
        // redis
        REDIS_HOST: Joi.string()
          .default('auth-cache-srv'),
        REDIS_PORT: Joi.number()
          .default(6379),
      }),
    }),
  ],
})
export class ConfigModule {}
