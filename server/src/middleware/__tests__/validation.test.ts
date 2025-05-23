import request from "supertest";
import { app } from "../../app";

describe("Validation middleware on /api/:year/winners", () => {
  it("rejects non-numeric year with 400", async () => {
    const res = await request(app).get("/api/not-a-number/winners");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].path).toEqual(["year"]);
  });

  it("rejects year below 2005 with 400", async () => {
    const res = await request(app).get("/api/1999/winners");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toMatch(/at least 2005/);
  });

  it("accepts valid year and returns 200", async () => {
    const res = await request(app).get("/api/2005/winners");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
