import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';
import * as cors from 'fastify-cors';
import * as fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/exception.filter';


async function bootstrap() {
  const port = process.env.PORT;
  if (port === undefined) {
    throw new Error('Must specify PORT in ENV');
  }
  const cookieSecret = process.env.COOKIE_SECRET;
  if (cookieSecret === undefined) {
    throw new Error('Must specify COOKIE_SECRET in ENV');
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
    }),
  );

  app.register(helmet);
  app.register(cors);
  app.register(fastifyCookie, {
    secret: cookieSecret, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  });

  // request body validation
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(+port, '0.0.0.0');
}
bootstrap();
