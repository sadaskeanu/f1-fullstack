import express from "express";
import request from "supertest";
import { logger } from "../logger";

describe("logger middleware", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(logger);
    app.get("/test", (_req, res) => {
      res.status(200).send("OK");
    });
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("logs a request to /test", async () => {
    await request(app).get("/test").expect(200);

    expect(consoleSpy).toHaveBeenCalled();
    const logOutput = consoleSpy.mock.calls[0]?.[0] || "";
    expect(logOutput).toMatch(/\[.*\] GET \/test 200 - \d+ms/);
  });
});
