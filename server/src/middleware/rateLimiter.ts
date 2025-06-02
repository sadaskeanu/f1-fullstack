import { Request, Response, NextFunction } from "express";

const requestCounts = new Map<string, number[]>();

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 100;

  const timestamps = requestCounts.get(ip) || [];

  const recent = timestamps.filter((ts) => now - ts < windowMs);

  if (recent.length >= maxRequests) {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later." });
  }

  recent.push(now);
  requestCounts.set(ip, recent);

  next();
};
