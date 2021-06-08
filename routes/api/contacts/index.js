const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");
const {
  validateCreateContact,
  validateUpdateContact,
  validateObjectId,
} = require("./validation");

router.get("/", guard, ctrl.getAll);

router.get("/:id", guard, validateObjectId, ctrl.getById);

router.post("/", guard, validateCreateContact, ctrl.create);

router.delete("/:id", guard, validateObjectId, ctrl.remove);

router.patch(
  "/:id",
  guard,
  validateObjectId,
  validateUpdateContact,
  ctrl.update
);

router.patch("/:id/favorite", guard, validateObjectId, ctrl.update);

module.exports = router;
