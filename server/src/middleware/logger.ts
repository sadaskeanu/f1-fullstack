import { Request, Response, NextFunction } from "express";

/**
 * Express middleware for logging HTTP requests.
 * - Logs method, URL, status code, and response time after request finishes.
 * - Uses ISO timestamp and logs to console.
 */

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } ${res.statusCode} - ${duration}ms`;
    console.log(log);
  });

  next();
}
