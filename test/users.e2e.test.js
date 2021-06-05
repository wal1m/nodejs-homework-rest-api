const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { newContact, newUser } = require("./data/data");
const app = require("../app");

const db = require("../model/db");
const Contact = require("../model/shemas/contact");
const User = require("../model/shemas/user");
const Users = require("../model/users");

describe("E2E test the users api/contacts", () => {
  let user, token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email });
    user = await Users.create(newUser);
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, JWT_SECRET_KEY);
    await Users.updateToken(user._id, token);
  });

  beforeEach(async () => {
    await Contact.deleteMany();
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  describe("should handle get request", () => {
    it("should response 200 status for get all contacts", async () => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
    });
  });
  describe("should handle post request", () => {});
  describe("should handle put request", () => {});
  describe("should handle delete request", () => {});
});
