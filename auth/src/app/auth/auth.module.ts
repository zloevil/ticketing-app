import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from '../../repository/user/user.repository';
import { AuthService } from './auth.service';

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule,
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}
