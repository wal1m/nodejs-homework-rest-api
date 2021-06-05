const { update } = require("../controllers/contacts");
const Contacts = require("../model/contacts");

jest.mock("../model/contacts");

describe("Unit test users controllers", () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 3 } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  it("without user DB", async () => {
    Contacts.update = jest.fn();
    const result = await update(req, res, next);
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Not Found");
  });
  it("DB return an exception", async () => {
    Contacts.update = jest.fn(() => {
      throw new Error('Ups')
    });
    await update(req, res, next)
    expect(next).toHaveBeenCalled()
  });
});
