import { Request, Response, NextFunction } from "express";
import { RATE_LIMIT } from "../constants/constants";

type RateLimitRecord = {
  count: number;
  windowStart: number;
};

const requestCounts = new Map<string, RateLimitRecord>();

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (record) {
    const timePassed = now - record.windowStart;

    if (timePassed < RATE_LIMIT.WINDOW_MS) {
      if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
        res
          .status(429)
          .json({ message: "Too many requests, please try again later." });
      }

      record.count += 1;
    } else {
      requestCounts.set(ip, { count: 1, windowStart: now });
    }
  } else {
    requestCounts.set(ip, { count: 1, windowStart: now });
  }

  next();
};
