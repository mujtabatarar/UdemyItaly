import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  apiPort: process.env.API_PORT,

  RedisURL: process.env.REDIS_URL,
  UdemyTCPPort: process.env.UDEMY_TCP_PORT,
  UdemyTCPHost: process.env.UDEMY_TCP_Host,

  KafkaHost: process.env.KAFKA_HOST,
  RedisHost: process.env.REDIS_HOST,
  RedisPort: process.env.REDIS_PORT,

  logMode: process.env.LOG_MODE,
}));
