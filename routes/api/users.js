const { Router } = require("express");
const LoginSchema = require("../../verifier/userLoginSchema");
const RegisterSchema = require("../../verifier/userRegisterSchema");
//
const validateBody = require("../../middlewares/validateBody");
// const authenticate = require("../../middlewares/authenticate");
//
const controller = require("../../controller/userController");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const router = new Router();

// реєстрація нового користувача
router.post("/register", validateBody(RegisterSchema), controller.registration);
// логінізація користувача, отримуємо токен
router.post("/login", validateBody(LoginSchema), controller.login);
// вивести дані залогіненого користувача
router.get("/current", authenticate, controller.current);
// вийти із системи, видалити токен
router.post("/logout", authenticate, controller.logout);
// змінити аватарку
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  controller.handleAvatar
  //
);
router.get("/verify/:verificationToken", controller.userVerification);
// =================================================================
module.exports = router;
