const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:id", guard, ctrl.getById);

router.post("/", guard, validateCreateContact, ctrl.create);

router.delete("/:id", guard, ctrl.remove);

router.patch("/:id", guard, validateUpdateContact, ctrl.update);

router.patch("/:id/favorite", guard, ctrl.update);

module.exports = router;
