const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  remove,
  update,
  updateStatusContact,
} = require("../../model/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getAll();
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getById(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found contact by id" });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateContact, async (req, res, next) => {
  try {
    const contact = await create(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    // if (error.name === "ValidationError") {
    //   error.status = 400;
    // }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await remove(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateUpdateContact, async (req, res, next) => {
  try {
    const contacts = await update(req.params.id, req.body);
    if (contacts) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contacts } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const contact = await updateStatusContact(req.params.id, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
