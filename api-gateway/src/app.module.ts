import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Req,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminService } from './modules/admin/admin.service';

// import { AdminMiddleware } from 'src/middleware/admin.middleware';

import { AdminModule } from './modules/admin/admin.module';

import { AppLoggerMiddleware } from './middleware/logger.middleware';
import { LoggerModule } from 'nestjs-pino';
import { RedisHandler } from './helpers/redis-handler-with-pool';
import { ClientsModule } from '@nestjs/microservices';
import { udemyMicroServiceConfigTcp } from './microServiceConfigs';

@Module({
  imports: [
    AdminModule,
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'api-gateway',
        level: 'debug',
        formatters: {
          level: (label) => {
            return { level: label };
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AdminService, RedisHandler],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    try {
      // App Logger Middleware
      consumer.apply(AppLoggerMiddleware).forRoutes('*');
    } catch (err) {
      return;
    }
  }
}
