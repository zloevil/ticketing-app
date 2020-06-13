/* eslint-disable import/no-mutable-exports */
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import * as fastifyCookie from 'fastify-cookie';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../src/repository/user/user.repository';
import { AuthController } from '../src/app/auth/auth.controller';
import { JwtModule } from '../src/shared/jwt/jwt.module';
import { LoggerInitModule } from '../src/shared/logger/logger.module';
import { AuthService } from '../src/app/auth/auth.service';
import { UserEntity } from '../src/entity/user.entity';
import { UserDto } from '../src/app/auth/dto/user.dto';
import { ConfigModule } from '../src/shared/config/config.module';
import { AllExceptionsFilter } from '../src/shared/filters/exception.filter';

declare global {
  namespace NodeJS {
    interface Global {
      getCookies(s: FastifyAdapter): Promise<{ jwt: string }>
    }
  }
}

export const user = new UserEntity();
user.email = 'zlo@evil.io';
user.id = '666';
user.salt = 'tlas';
user.hash = 'zloevil';
user.isActive = true;
user.isDeleted = false;
user.isReadOnly = false;
user.updated = (new Date()).toISOString();
user.created = (new Date()).toISOString();

const repository = {
  user,
  userDto: new UserDto(user),
  userCreated: false,
  async findByEmail(email: string) {
    if (this.userCreated && email === this.user.email) {
      return this.user;
    }
    return undefined;
  },
  async findById(id: string) {
    if (this.userCreated && id === this.user.id) {
      return this.user;
    }
    return undefined;
  },
  async createByEmail() {
    this.userCreated = true;
    return this.user;
  },
  async validatePassword(password: string, u: UserEntity) {
    return password === u.hash;
  },
};

export let server: FastifyAdapter;
export let jwtService: JwtService;
let app: INestApplication;
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    controllers: [
      AuthController,
    ],
    imports: [
      ConfigModule,
      JwtModule,
      LoggerInitModule,
    ],
    providers: [
      AuthService,
      UserRepository,
    ],
  })
    .overrideProvider(UserRepository)
    .useValue(repository)
    .compile();

  app = moduleRef.createNestApplication(
    new FastifyAdapter({
      logger: true,
    }),
  );
  app.getHttpAdapter().getInstance().register(fastifyCookie, {
    secret: 'test', // for cookies signature
    parseOptions: {}, // options for parsing cookies
  });

  // request body validation
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  server = app.getHttpAdapter().getInstance();

  jwtService = moduleRef.get<JwtService>(JwtService);
});

afterAll(async () => {
  server.close();
  await app.close();
});

// global helper functions
global.getCookies = async (s: FastifyAdapter) => {
  await s.inject({
    method: 'POST',
    url: '/api/users/sign-up',
    payload: {
      email: 'zlo@evil.io',
      password: 'zloevil',
    },
  });
  const response = await s.inject({
    method: 'POST',
    url: '/api/users/sign-in',
    payload: {
      email: 'zlo@evil.io',
      password: 'zloevil',
    },
  });
  return {
    jwt: response.cookies[0].value,
  };
};
