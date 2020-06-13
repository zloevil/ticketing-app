import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
