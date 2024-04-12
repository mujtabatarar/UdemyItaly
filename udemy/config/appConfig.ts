import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  TCPPort: process.env.TCP_PORT,
  TCPHost: process.env.TCP_HOST,

  KafkaHost: process.env.KAFKA_HOST,
  RedisHost: process.env.REDIS_HOST,
  RedisPort: process.env.REDIS_PORT,
  logMode: process.env.LOG_MODE,

  RedisURL: process.env.REDIS_URL,
}));
