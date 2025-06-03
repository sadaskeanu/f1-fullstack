import { Request, Response, NextFunction } from "express";
import { RATE_LIMIT } from "../constants/constants";

const requestCounts = new Map<string, number[]>();

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || "unknown";
  const now = Date.now();

  const timestamps = requestCounts.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT.WINDOW_MS);

  if (recent.length >= RATE_LIMIT.MAX_REQUESTS) {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  }

  recent.push(now);
  requestCounts.set(ip, recent);

  next();
};
