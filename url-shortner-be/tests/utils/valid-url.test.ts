import { isValidUrl } from '../../src/utils/valid-url'
import { expect, test } from "vitest";

test('should return true when valid url is passed to isValidUrl', () => {
  expect(isValidUrl("https://www.google.co.uk/")).toBeTruthy();
})

test("should return false when an invalid url is passed to isValidUrl", () => {
  expect(isValidUrl("invalid-url")).toBeFalsy();
});