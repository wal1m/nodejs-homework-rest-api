const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateCreateContact, ctrl.create);

router.delete("/:id", ctrl.remove);

router.patch("/:id", validateUpdateContact, ctrl.update);

router.patch("/:id/favorite", ctrl.update);

module.exports = router;
