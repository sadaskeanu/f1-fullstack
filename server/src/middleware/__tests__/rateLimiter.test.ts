import express from "express";
import request from "supertest";
import { rateLimiter } from "../rateLimiter";

describe("rateLimiter middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.get("/test", rateLimiter, (req, res) => {
      res.status(200).send("OK");
    });
  });

  it("allows requests under the limit", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get("/test");
      expect(res.status).toBe(200);
      expect(res.text).toBe("OK");
    }
  });

  it("blocks requests over the limit", async () => {
    const ip = "1.2.3.4";

    for (let i = 0; i < 100; i++) {
      await request(app).get("/test").set("X-Forwarded-For", ip);
    }

    const res = await request(app).get("/test").set("X-Forwarded-For", ip);
    expect(res.status).toBe(429);
    expect(res.body.message).toBe("Too many requests, please try again later.");
  });
});
