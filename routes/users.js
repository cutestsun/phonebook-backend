const express = require("express");
const router = express.Router();
const {
  signUpController,
  loginController,
  logoutController,
  currentUserController,
  updateAvatarController,
} = require("../controllers/userController");

const validateBody = require("../middlewares/validateBody");
const { userSignUpSchema, userLoginSchema } = require("../schemas/userSchema");
const authentificate = require("../middlewares/authentificate");
const upload = require("../middlewares/upload");

router.post("/signup", validateBody(userSignUpSchema), signUpController);
router.post("/login", validateBody(userLoginSchema), loginController);
router.post("/logout", authentificate, logoutController);
router.get("/current", authentificate, currentUserController);
router.patch(
  "/avatar",
  authentificate,
  upload.single("avatar"),
  updateAvatarController
);

module.exports = router;
