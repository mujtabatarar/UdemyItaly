import {
  ClientOptions,
  KafkaOptions,
  RedisOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import appConfig from 'config/appConfig';

export const microServiceConfigKafka: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'udemy-service',
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
      groupId: 'udemy-consumer-new' + '-' + Math.random(),
      sessionTimeout: 300000,
      retry: { retries: 30 },
    },
    subscribe: {
      fromBeginning: false,
    },
  },
};

export const microServiceConfigTcp: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: appConfig().TCPHost,
    port: Number(appConfig().TCPPort),
  },
};

export const microServiceConfigRedis: RedisOptions = {
  transport: Transport.REDIS,

  options: {
    url: appConfig().RedisURL, // Example URL assuming Redis is running locally on the default port 6379
    retryAttempts: 5, // Number of retry attempts
    retryDelay: 3000, // Delay between retries in milliseconds
  },
};
