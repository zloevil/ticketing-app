import {
  Body, ClassSerializerInterceptor,
  Controller, Get, Post, Response, UseInterceptors,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino/dist';
import { FastifyCookieOptions } from 'fastify-cookie';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Req } from '../../shared/decorator/user.decorator';
import { AccessPipe } from '../../shared/pipe/access.pipe';
import { ReqDto } from '../common/dto/req.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/api/users')
export class AuthController {
  constructor(
    private logger: Logger,
    private authService: AuthService,
  ) {}

  @Get('/current-user')
  async getCurrentUser(
    @Req(AccessPipe) req: ReqDto,
  ) {
    return req.user;
  }

  @Post('/sign-in')
  async signIn(
    @Body() credentials: CredentialsDto,
    @Response() response: FastifyReply<FastifyCookieOptions>,
  ) {
    const user = await this.authService.getUserByCredentials(credentials);
    await this.authService.authorize(response, user);
  }

  @Post('/sign-up')
  async signUp(
    @Body() credentials: CredentialsDto,
    @Response() response: FastifyReply<FastifyCookieOptions>,
  ) {
    const user = await this.authService.makeNewUser(credentials);
    await this.authService.authorize(response, user);
  }

  @Post('/sign-out')
  signOut(
    @Req(AccessPipe) req: ReqDto,
    @Response() response: FastifyReply<FastifyCookieOptions>,
  ) {
    response.setCookie('jwt', '');
    // response.clearCookie('jwt', {});
    response.send();
  }
}
