const request = require("supertest");
const { newTestUser } = require("./data/data");
const db = require("../model/db");
const app = require("../app");

const User = require("../model/shemas/user");
const fs = require("fs/promises");

jest.mock("cloudinary");

describe("E2E test the users api/users", () => {
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newTestUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newTestUser.email });
    await mongo.disconnect();
  });

  it("should response 201 registration user", async () => {
    const res = await request(app).post("/api/users/signup").send(newTestUser);
    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
  });
  it("should response 409 registration user", async () => {
    const res = await request(app).post("/api/users/signup").send(newTestUser);
    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
  });
  it("should response 200 login user", async () => {
    const res = await request(app).post("/api/users/login").send(newTestUser);
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    token = res.body.data.token;
  });
  it("should response 401 login user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "fake@test.com", password: "123456" });
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });
  it("should response 200 upload avatar user", async () => {
    const buf = await fs.readFile("./test/data/default-avatar.png");

    const res = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buf, "default-avatar.png");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.data.avatarUrl).toBe("avatar");
  });
  it("should response 401 upload avatar user", async () => {
    const res = await request(app)
      .patch("/api/users/avatars")
      .send({ email: "fake@test.com", password: "123456" });
    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });
  it("should response 204 logout user", async () => {
    const res = await request(app)
      .post("/api/users/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(204);
    expect(res.body).toBeDefined();
  });
});
