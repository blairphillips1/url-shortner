import { createClient } from "redis";
import { StoredInfo } from "../interfaces/StoredInfo";

export class RedisClient {
  private client;

  constructor() {
    this.client = createClient();
    this.client.connect();
  }

  async addUrlToRedis(key: string, urlInfo: StoredInfo) {
    return await this.client.set(key, JSON.stringify(urlInfo));
  }

  async deleteUrlFromRedis(key: string) {
    return await this.client.del(key);
  }

  async getUrlFromRedis(key: string) {
    return await this.client.get(key);
  }
}