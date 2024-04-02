import {
  shortURLGenerator,
  createBase64Key,
  getLongUrl,
  deleteShortUrlEntry,
} from "../../src/services/url-shortner-service";
import { expect, test, vi } from "vitest";
import { RedisClient } from "../../src/redis/redis-client";
import { StoredInfo } from "../../src/interfaces/StoredInfo";

vi.mock("../../src/redis/redis-client");

const returnedStoredInfo: StoredInfo = {
  longUrl: "https://www.google.co.uk/",
  shortUrl: "http://localhost:3000/KB02QeM=",
};

test("should return http://localhost:3000/testKey when testKey is passed into shortUrlGenerator", () => {
  expect(shortURLGenerator("hKB02QeM=")).toEqual(
    "http://localhost:3000/hKB02QeM="
  );
});

test("should return http://localhost:3000/testKey when longUrl is passed into createBase64Key", () => {
  expect(createBase64Key("https://www.google.co.uk/")).toEqual("KB02QeM=");
});

test("should return 'Url does not exist' when getLongUrl does not exist", async () => {
  const mock = vi.spyOn(RedisClient.prototype, 'getUrlFromRedis');
  mock.mockReturnValue(Promise.resolve(undefined));
  expect(await getLongUrl("hKB02QeM=")).toEqual("Url does not exist");
});

test("should return 'https://www.google.co.uk/' when getLongUrl does exist", async () => {
  const mock = vi.spyOn(RedisClient.prototype, "getUrlFromRedis");
  mock.mockReturnValue(Promise.resolve(JSON.stringify(returnedStoredInfo)));
  expect(await getLongUrl("hKB02QeM=")).toEqual(returnedStoredInfo.longUrl);
});

test("should return 'Short url doesn't exists' when short url does not exist", async () => {
  const mock = vi.spyOn(RedisClient.prototype, "getUrlFromRedis");
  mock.mockReturnValue(Promise.resolve(undefined));
  expect(await deleteShortUrlEntry("http://localhost:3000/KB02QeM=")).toEqual(
    "Short url doesn't exists"
  );
});

test("should return 'Short url deleted' when short url does exist", async () => {
  const mock = vi.spyOn(RedisClient.prototype, "getUrlFromRedis");
  mock.mockReturnValue(Promise.resolve(JSON.stringify(returnedStoredInfo)));
  expect(await deleteShortUrlEntry("http://localhost:3000/KB02QeM=")).toEqual(
    "Short url deleted"
  );
});

