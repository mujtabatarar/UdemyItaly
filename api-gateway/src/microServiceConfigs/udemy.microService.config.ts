import {
  ClientOptions,
  KafkaOptions,
  RedisOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import appConfig from 'config/appConfig';
require('dotenv').config();

export const udemyMicroServiceConfigKafka: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'udemy-ag-service',
      brokers: [...`${appConfig().KafkaHost}`.split(',')],
      connectionTimeout: 3000, // Time in milliseconds to wait for a successful connection. The default value is: 1000.

      // reference: https://kafka.js.org/docs/1.10.0/configuration#a-name-retry-a-default-retry
      // retry logic for KafkaJSNumberOfRetriesExceeded = Random(previousRetryTime * (1 - factor), previousRetryTime * (1 + factor)) * multiplier
      retry: {
        initialRetryTime: 300, // Initial value used to calculate the retry in milliseconds
        maxRetryTime: 30000, //Maximum wait time for a retry in milliseconds
        retries: 15,
        factor: 0.2,
        multiplier: 2,
      },
    },
    consumer: {
      groupId: 'udemy-consumer-ag',

      retry: { retries: 30 },
    },
    subscribe: {
      fromBeginning: false,
    },
  },
};

export const udemyMicroServiceConfigTcp: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: appConfig().UdemyTCPHost,
    port: Number(appConfig().UdemyTCPPort),
  },
};

export const udemyMicroServiceConfigRedis: RedisOptions = {
  transport: Transport.REDIS,

  options: {
    url: appConfig().RedisURL,
    retryAttempts: 15,
    retryDelay: 3000,
  },
};
