import { IncomingHttpHeaders } from "http";
import { describe, expect, test } from "vitest";
import { getAPIKey } from "./auth";

describe("getApiKey", () => {
  test("should return null if authHeader falsey", () => {
    const testHeaders = {} as unknown as IncomingHttpHeaders;

    expect(getAPIKey(testHeaders)).toBeNull();
  });

  test("Should return null if authHeader is less than two", () => {
    const testHeaders = {
      authorization: "ApiKey",
    } as unknown as IncomingHttpHeaders;

    expect(getAPIKey(testHeaders)).toBeNull();
  });

  test("Should return null if authHeader does not start with ApiKey", () => {
    const testHeaders = {
      authorization: "test ApiKey",
    } as unknown as IncomingHttpHeaders;

    expect(getAPIKey(testHeaders)).toBeNull();
  });

  test("Should return ApiKey value if valid", () => {
    const testHeaders = {
      authorization: "ApiKey test",
    } as unknown as IncomingHttpHeaders;

    expect(getAPIKey(testHeaders)).toBe("test");
  });
});
