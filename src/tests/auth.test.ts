import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "src/api/auth";
import { describe, expect, test } from "vitest";

describe("get API Key", () => {
  const apiKey = "asdf1234";

  test("can get API key", () => {
    const header: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKey}`,
    };

    const result = getAPIKey(header);

    expect(result).toBe(apiKey);
  });

  test("API key null without authorization header", () => {
    const header: IncomingHttpHeaders = {
      //   authorization: `ApiKey ${apiKey}`,
    };

    const result = getAPIKey(header);

    expect(result).toBeNull();
  });

  test("API key null on no values after key", () => {
    const header: IncomingHttpHeaders = {
      authorization: `ApiKey`,
    };

    const result = getAPIKey(header);

    expect(result).toBeNull();
  });

  test("API key null on key mismatch", () => {
    const header: IncomingHttpHeaders = {
      authorization: `ApiKeys ${apiKey}`,
    };

    const result = getAPIKey(header);

    expect(result).toBe(1);
  });
});
