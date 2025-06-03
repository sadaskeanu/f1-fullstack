import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import { z } from "zod";
import { errorHandler } from "../errorHandler";

describe("errorHandler middleware", () => {
  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    app.get("/error", () => {
      throw new Error("Something went wrong");
    });

    app.post(
      "/zod-error",
      (req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({
          name: z.string().min(3),
        });

        try {
          schema.parse(req.body);
        } catch (err) {
          next(err);
        }
      }
    );

    app.use(errorHandler);
  });

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it("returns 500 and error message for general errors", async () => {
    const res = await request(app).get("/error");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Something went wrong" });
    expect(consoleErrorMock).toHaveBeenCalled();
  });

  it("returns 400 and Zod validation error details", async () => {
    const res = await request(app).post("/zod-error").send({ name: "" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors[0].message).toContain(
      "String must contain at least 3 character"
    );
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
