import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { FastifyReply } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../repository/user/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { UserEntity } from '../../entity/user.entity';
import { BaseService } from '../../shared/base-classes/base-service';
import { UserDto } from './dto/user.dto';


@Injectable()
export class AuthService extends BaseService {
  constructor(
    private logger: Logger,
    private jwtService: JwtService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super(logger);
  }

  async authorize(response: FastifyReply<FastifyCookieOptions>, user: UserEntity) {
    try {
      const token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });
      response.setCookie('jwt', token, {
        secure: true,
        signed: false,
        httpOnly: true,
      });
      response.send(new UserDto(user));
    } catch (e) {
      this.throwInternalError(
        'Error while trying to authorize user',
        e,
        user,
      );
    }
  }

  async makeNewUser(credentials: CredentialsDto) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findByEmail(credentials.email);
    } catch (e) {
      this.throwInternalError(
        'Error while trying to find user by email',
        e,
        credentials,
      );
    }

    if (user !== undefined) {
      this.throwBadRequestError(
        'User with this email already exists',
        credentials,
      );
    }


    try {
      user = await this.userRepository.createByEmail(credentials);
    } catch (e) {
      this.throwInternalError(
        'Error while trying to save user to the DB',
        e,
        credentials,
      );
    }
    return user;
  }

  async getUserByCredentials(credentials: CredentialsDto) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findByEmail(credentials.email);
    } catch (e) {
      this.throwInternalError(
        'Error while trying to find user in DB',
        e,
        credentials,
      );
    }

    if (user === undefined) {
      this.throwBadRequestError(
        'Incorrect credentials',
        credentials,
      );
    }

    const check = await this.userRepository.validatePassword(credentials.password, user);

    if (!check) {
      this.throwBadRequestError(
        'Incorrect credentials',
        credentials,
      );
    }

    return user;
  }

  async getUserByToken(token: string) {
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findById(tokenPayload.id);
      if (user === undefined) {
        this.throwBadRequestError(
          'Incorrect token',
          { token },
        );
      }
      return user;
    } catch (e) {
      this.throwInternalError(
        'Error while trying to verify token',
        e,
        { token },
      );
    }
    return undefined;
  }
}
