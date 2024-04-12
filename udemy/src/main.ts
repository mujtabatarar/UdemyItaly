import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import {
  microServiceConfigKafka,
  microServiceConfigRedis,
  microServiceConfigTcp,
} from 'config/microServiceConfig';
import appConfig from 'config/appConfig';

require('dotenv').config();

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //kafka service
  // app.connectMicroservice(microServiceConfigKafka);

  // TCP service
  app.connectMicroservice(microServiceConfigTcp);

  // TCP service
  app.connectMicroservice(microServiceConfigRedis);

  app.startAllMicroservicesAsync();

  logger.log(
    'Udemy Micro-service is listening on port: ' + appConfig().TCPPort,
  );
}
bootstrap();
