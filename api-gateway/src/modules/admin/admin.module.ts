import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import appConfig from 'config/appConfig';
import { RedisHandler } from 'src/helpers/redis-handler-with-pool';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  udemyMicroServiceConfigTcp,
  udemyMicroServiceConfigRedis,
} from 'src/microServiceConfigs';
@Module({
  imports: [
    ClientsModule.register([
      {
        ...udemyMicroServiceConfigTcp,
        name: 'UDEMY_MICRO_SERVICE_CONFIG',
      },
      {
        ...udemyMicroServiceConfigRedis,
        name: 'UDEMY_MICRO_SERVICE_CONFIG',
      },
    ]),
    // ClientsModule.register([
    //   {
    //     name: 'REDIS_CLIENT',
    //     transport: Transport.REDIS,
    //     options: {
    //       url: 'redis://localhost:6379',
    //       password: 'your_redis_password',
    //       db: '0',
    //       retryAttempts: 5,
    //       retryDelay: 1000,
    //       // Other options...
    //     },
    //   },
    // ]),
  ],

  controllers: [AdminController],
  providers: [AdminService, RedisHandler],
})
export class AdminModule {}
