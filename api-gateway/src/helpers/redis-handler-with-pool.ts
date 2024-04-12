import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import appConfig from 'config/appConfig';
import { Pool, Options as PoolOptions, Factory } from 'generic-pool';
import retry from 'retry-as-promised';
import redis, { ClientOpts as RedisOptions, RedisClient } from 'redis';

const genericPool = require('generic-pool');
@Injectable()
export class RedisHandler {
  private pool;
  private opts = {
    max: 100, // maximum size of the pool
    min: 10, // minimum size of the pool
  };
  constructor() {
    const createClient = () => {
      return new Promise((resolve, reject) => {
        const client = new RedisClient({
          host: appConfig().RedisHost,
          port: appConfig().RedisPort,
        });
        client.on('error', (err) => {
          reject(err);
        });
        client.on('connect', () => {
          resolve(client);
          // console.log(`redis-pool-redis-client: connected`);
        });
      });
    };
    const factory: Factory<any> = {
      create: async () => {
        // // for retry
        // let createAttempts = 0;
        // // this is due to the limitation of node-pool ATM
        // // https://github.com/coopernurse/node-pool/issues/161#issuecomment-261109882
        // return retry(
        //   () => {
        //     createAttempts += 1;
        //     if (createAttempts > 3) {
        //       const err = new Error(`Failed redis createClient,}`);
        //       // reset for next try
        //       createAttempts = 0;
        //       return Promise.resolve(err);
        //     }
        //     return createClient();
        //   },
        //   {
        //     max: 3,
        //     name: 'factory.create',
        //   },
        // );
        return await createClient();
      },
      destroy: (client: RedisClient) =>
        new Promise((resolve) => {
          try {
            // Flush when closing.
            client.end(true);
            resolve();
          } catch (err) {
            // throw error cause infinite event loop; limitation of node-pool
            // throw err;
            // console.log(`redis-pool error: `);
          }
        }),
    };
    this.pool = genericPool.createPool(factory, this.opts);
  }

  async getMatchedClients(pattern: string) {
    // const scanList = [];
    // let cursor = '0';
    // do {
    //   const reply = await this.scanRedisKey(cursor, 'MATCH', pattern);
    //   cursor = reply[0];
    //   scanList.push(...reply[1]);
    // } while (cursor !== '0');
    // return scanList;
    return await this.getAllKeys(pattern);
  }

  async rpush(keys, value) {
    const client: RedisClient = await this.getClient();
    const rpushRedis: Function = await promisify(client.rpush).bind(client);
    const data = await rpushRedis(keys, value);
    this.releaseClient(client);
    return data;
  }

  async lrange(keys, start, end) {
    const client: RedisClient = await this.getClient();
    const lrangeRedis: Function = await promisify(client.lrange).bind(client);
    const data = await lrangeRedis(keys, start, end);
    this.releaseClient(client);
    return data;
  }

  async mget(keys) {
    const client: RedisClient = await this.getClient();
    const mgetRedis: Function = await promisify(client.mget).bind(client);
    const data = await mgetRedis(keys);
    this.releaseClient(client);
    return data;
  }

  async setex(key, time, value) {
    const client: RedisClient = await this.getClient();
    const setex: Function = await promisify(client.setex).bind(client);
    const data = await setex(key, time, value);
    this.releaseClient(client);
    return data;
  }

  async setNxEx(key, time, value) {
    const client: RedisClient = await this.getClient();
    const set: Function = await promisify(client.set).bind(client);
    const data = await set(key, value, 'NX', 'EX', time);
    this.releaseClient(client);
    return data;
  }

  async hget(keys, name) {
    const client: RedisClient = await this.getClient();
    const hgetRedis: Function = await promisify(client.hget).bind(client);
    const data = await hgetRedis(keys, name);
    this.releaseClient(client);
    return data;
  }
  async set(keys, value) {
    const client: RedisClient = await this.getClient();
    const setRedis: Function = await promisify(client.set).bind(client);
    const data = await setRedis(keys, value);
    this.releaseClient(client);
    return data;
  }
  async mset(keysValue) {
    const client: RedisClient = await this.getClient();
    const msetRedis: Function = await promisify(client.mset).bind(client);
    const data = await msetRedis(keysValue);
    this.releaseClient(client);
    return data;
  }
  async hset(key, hash, value) {
    const client: RedisClient = await this.getClient();
    const hsetRedis: Function = await promisify(client.hset).bind(client);
    const data = await hsetRedis(key, hash, value);
    this.releaseClient(client);
    return data;
  }
  async hmset(key, hash) {
    const client: RedisClient = await this.getClient();
    const hmsetRedis: Function = await promisify(client.hmset).bind(client);
    const data = await hmsetRedis(key, hash);
    this.releaseClient(client);
    return data;
  }
  async incr(key) {
    const client: RedisClient = await this.getClient();
    const incrRedis: Function = await promisify(client.incr).bind(client);
    const data = await incrRedis(key);
    this.releaseClient(client);
    return data;
  }
  async decr(key) {
    const client: RedisClient = await this.getClient();
    const decrRedis: Function = await promisify(client.decr).bind(client);
    const data = await decrRedis(key);
    this.releaseClient(client);
    return data;
  }
  async del(key) {
    const client: RedisClient = await this.getClient();
    const delRedis: Function = await promisify(client.del).bind(client);
    const data = await delRedis(key);
    this.releaseClient(client);
    return data;
  }
  async hdel(key, hash) {
    const client: RedisClient = await this.getClient();
    const hdelRedis: Function = await promisify(client.hdel).bind(client);
    const data = await hdelRedis(key, hash);
    this.releaseClient(client);
    return data;
  }

  async hgetall(keys) {
    const client: RedisClient = await this.getClient();
    const hgetallRedis: Function = await promisify(client.hgetall).bind(client);
    const data = await hgetallRedis(keys);
    this.releaseClient(client);
    return data;
  }

  async getAllKeys(keys) {
    const client: RedisClient = await this.getClient();
    const keysRedis: Function = await promisify(client.keys).bind(client);
    const data = await keysRedis(keys);
    this.releaseClient(client);
    return data;
  }

  async getRedisKey(key) {
    const client: RedisClient = await this.getClient();
    const getRedis: Function = await promisify(client.get).bind(client);
    const data = await getRedis(key);
    this.releaseClient(client);
    return data;
  }

  async scanRedisKey(cursor, command, pattern) {
    const client: RedisClient = await this.getClient();
    const scanRedis: Function = await promisify(client.scan).bind(client);
    const data = await scanRedis(cursor, command, pattern);
    this.releaseClient(client);
    return data;
  }
  async expireat(dataKey, time) {
    const client: RedisClient = await this.getClient();
    const expireatRedis: Function = await promisify(client.expireat).bind(
      client,
    );
    const data = await expireatRedis(dataKey, time);
    this.releaseClient(client);
    return data;
  }

  async getClient() {
    return await this.pool.acquire();
    // return await new RedisClient({
    //   host: appConfig().RedisHost,
    //   port: appConfig().RedisPort,
    // });
  }

  async releaseClient(client: RedisClient) {
    await this.pool.release(client);
    //  await client.end(true)
  }
}
