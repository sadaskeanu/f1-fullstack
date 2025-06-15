import { rateLimiter } from "../rateLimiter";
import { redisMock } from "../../__mocks__/redisMock";
import { RATE_LIMIT } from "../../constants/constants";

jest.mock("../../config/redis", () => {
  return {
    __esModule: true,
    default: jest.fn(() => redisMock),
  };
});

const mockReq = (ip = "1.2.3.4") => ({ ip, headers: {} } as any);

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

const next = jest.fn();

beforeEach(() => {
  redisMock.clear();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

test("allows request when tokens are available", async () => {
  const req = mockReq();
  const res = mockRes();

  await rateLimiter(req, res, next);

  expect(next).toHaveBeenCalled();
});

test("blocks request when tokens are depleted", async () => {
  const req = mockReq();
  const res = mockRes();

  const now = Date.now();
  jest.spyOn(Date, "now").mockReturnValue(now);
  const key = `rate-limit:ip:${req.ip}`;
  redisMock.data.set(key, {
    tokens: "0",
    lastRefill: `${now}`,
  });

  await rateLimiter(req, res, next);

  expect(res.status).toHaveBeenCalledWith(429);
  expect(res.json).toHaveBeenCalledWith({
    message: "Too many requests. Please try again later.",
  });
});

test("refills tokens after time passes", async () => {
  const req = mockReq();
  const res = mockRes();

  const now = Date.now();
  const past = now - RATE_LIMIT.WINDOW_MS;
  jest.spyOn(Date, "now").mockReturnValue(now);

  const key = `rate-limit:ip:${req.ip}`;
  redisMock.data.set(key, {
    tokens: "0",
    lastRefill: `${past}`,
  });

  await rateLimiter(req, res, next);

  expect(next).toHaveBeenCalled();
});
