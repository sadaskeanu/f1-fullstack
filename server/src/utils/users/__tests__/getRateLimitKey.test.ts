import { getRateLimitKey } from "../getRateLimitKey";
import type { Request } from "express";

describe("getRateLimitKey", () => {
  it("returns API key-based key when x-api-key header is present", () => {
    const req = {
      headers: { "x-api-key": "frontend-client" },
      ip: "123.45.67.89",
    } as unknown as Request;

    const key = getRateLimitKey(req);
    expect(key).toBe("api-key:frontend-client");
  });

  it("falls back to IP-based key when x-api-key header is missing", () => {
    const req = {
      headers: {},
      ip: "123.45.67.89",
    } as unknown as Request;

    const key = getRateLimitKey(req);
    expect(key).toBe("ip:123.45.67.89");
  });

  it("ignores non-string x-api-key header", () => {
    const req = {
      headers: { "x-api-key": [123] },
      ip: "10.0.0.1",
    } as unknown as Request;

    const key = getRateLimitKey(req);
    expect(key).toBe("ip:10.0.0.1");
  });
});
