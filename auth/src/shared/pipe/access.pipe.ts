import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino/dist';
import { ReqDto } from '../../app/common/dto/req.dto';
import { BaseService } from '../base-classes/base-service';

@Injectable()
export class AccessPipe extends BaseService implements PipeTransform {
  constructor(
    private jwtService: JwtService,
    private logger: Logger,
  ) {
    super(logger);
  }

  async transform(req: ReqDto) {
    if (req.token !== undefined) {
      try {
        return {
          ...req,
          user: await this.jwtService.verifyAsync(req.token),
        } as ReqDto;
      } catch (e) {
        this.throwNotAuthorized(
          'Incorrect token',
          e,
          req.token,
        );
      }
    }
    return req;
  }
}
