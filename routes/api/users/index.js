const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { validateUser, validateSubscription } = require("./validation");

router.get("/verify/:token", ctrl.verify);
router.post("/verify", ctrl.repeatSendEmailVerify);
router.post("/signup", validateUser, ctrl.signup);
router.post("/login", validateUser, ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.getCurrentUser);
router.patch("/", guard, validateSubscription, ctrl.updateSubscription);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatars);

module.exports = router;
