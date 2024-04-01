import * as crypto from "crypto";
import { StoredInfo } from "../interfaces/StoredInfo";
import { RedisClient } from "../redis/redis-client";

export async function createShortURL(longUrl: string): Promise<string> {
  const redisClient = new RedisClient();
  const key = createBase64Key(longUrl);
  const checkForDuplicate = await redisClient.getUrlFromRedis(key);
  if (checkForDuplicate) {
    const urlInfo: StoredInfo = JSON.parse(checkForDuplicate);
    return urlInfo.shortUrl;
  }
  await redisClient.addUrlToRedis(key, {
    longUrl,
    shortUrl: shortURLGenerator(key),
  });
  return shortURLGenerator(key);
}

function shortURLGenerator(key: string): string {
  return `http://localhost:3000/${key}`;
}

function createBase64Key(longUrl: string): string {
  return crypto.createHash("shake256", { outputLength: 5 }).update(longUrl).digest("base64").replace('/', '');
}

export async function getLongUrl(key: string): Promise<string> {
  const redisClient = new RedisClient();
  const storedInfo = await redisClient.getUrlFromRedis(key);
  if (storedInfo) {
    const urlInfo: StoredInfo = JSON.parse(storedInfo);
    return urlInfo.longUrl;
  }
  return "Url does not exist";
}

export async function deleteShortUrlEntry(key: string): Promise<string> {
  const redisClient = new RedisClient();
  const storedInfo = await redisClient.getUrlFromRedis(key);
  if (storedInfo) {
    await redisClient.deleteUrlFromRedis(key);
    return "Short url deleted";
  } else {
    return "Short url doesn't exists";
  }
}
