import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Middleware to validate request data using a Zod schema.
 * - Supports validation of body, query, or params (default is body).
 * - Replaces request data with the parsed (validated + typed) result.
 * - Responds with 400 and Zod error details if validation fails.
 */

export function validate<T>(
  schema: ZodSchema<T>,
  target: "params" | "query" | "body" = "body"
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[target]);
      (req as Request)[target] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ errors: err.errors });
      } else {
        next(err);
      }
    }
  };
}
