import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      entities: [
        `${__dirname}/../../entity/**/*{.ts,.js}`,
      ],
      cache: {
        type: 'ioredis',
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
