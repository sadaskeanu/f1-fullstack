import express, { Request, Response } from "express";
import request from "supertest";
import { validate } from "../validate";
import { yearParamSchema } from "../../validation/paramSchemas";

describe("validate middleware (Zod) isolated", () => {
  const app = express();
  app.get(
    "/:year/winners",
    validate(yearParamSchema, "params"),
    (req: Request, res: Response) => {
      res.status(200).json({ year: req.params.year });
    }
  );

  it("400 on non-numeric year", async () => {
    const res = await request(app).get("/not-a-number/winners");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].path).toEqual(["year"]);
  });

  it("400 on year < 2005", async () => {
    const res = await request(app).get("/1999/winners");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toMatch(/at least 2005/);
  });

  it("200 on valid year", async () => {
    const res = await request(app).get("/2025/winners");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ year: 2025 });
  });
});
