import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LoggerInitModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    LoggerInitModule,
    DatabaseModule,
    JwtModule,
  ],
  providers: [
  ],
  exports: [
    JwtModule,
  ],
})
export class SharedModule {}
