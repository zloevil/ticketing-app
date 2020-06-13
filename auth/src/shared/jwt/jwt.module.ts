import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.NODE_ENV === 'e2e' ? 'test' : process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  exports: [
    Jwt,
  ],
})
export class JwtModule {}
