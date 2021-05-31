const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const ctrl = require("../../../controllers/users");
const { validateUser, validateSubscription } = require("./validation");

router.post("/signup", validateUser, ctrl.signup);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.getCurrentUser);
router.patch("/", guard, validateSubscription, ctrl.updateSubscription);

module.exports = router;
