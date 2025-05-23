import { ZodSchema, ZodError } from "zod";
import { RequestHandler } from "express";

export function validate<T>(
  schema: ZodSchema<T>,
  target: "params" | "query" | "body" = "body"
): RequestHandler {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed as any;
      next();
      return;
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ errors: err.errors });
        return;
      }
      next(err as any);
    }
  };
}
