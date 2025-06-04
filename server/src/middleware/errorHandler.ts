import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

/**
 * Express error-handling middleware.
 * - Handles Zod validation errors with 400 status and detailed error messages.
 * - Logs all errors to the console.
 * - Sends a generic 500 response for unhandled errors.
 */

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("❌ Error:", err);

  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
  }

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err instanceof Error ? err.message : "Unexpected server error",
  });
}
