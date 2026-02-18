import { Redis } from '@upstash/redis';

const hasRedis =
  Boolean(process.env.KV_REST_API_URL) &&
  Boolean(process.env.KV_REST_API_TOKEN);

const memoryStore = new Map<string, any>();

const redis = hasRedis
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN
    })
  : null;

function patternToRegex(pattern: string) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  const regexString = `^${escaped.replace(/\*/g, '.*')}$`;
  return new RegExp(regexString);
}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    if (redis) {
      return redis.get<T>(key);
    }
    return memoryStore.has(key) ? (memoryStore.get(key) as T) : null;
  },
  async set(key: string, value: any) {
    if (redis) {
      await redis.set(key, value);
      return;
    }
    memoryStore.set(key, value);
  },
  async del(key: string) {
    if (redis) {
      await redis.del(key);
      return;
    }
    memoryStore.delete(key);
  },
  async keys(pattern: string): Promise<string[]> {
    if (redis) {
      return redis.keys(pattern);
    }
    const regex = patternToRegex(pattern);
    return [...memoryStore.keys()].filter((key) => regex.test(key));
  },
  async mget<T>(...keys: string[]): Promise<(T | null)[]> {
    if (redis) {
      const values = await redis.mget(...keys);
      return values as (T | null)[];
    }
    return keys.map((key) =>
      memoryStore.has(key) ? (memoryStore.get(key) as T) : null
    );
  }
};
