const { Router } = require("express");
const LoginSchema = require("../../verifier/userLoginSchema");
const RegisterSchema = require("../../verifier/userRegisterSchema");
const validateBody = require("../../helpers/validateBody");
const controller = require("../../controller/userController");
const router = new Router();

//реєстрація нового користувача
router.post("/register", validateBody(RegisterSchema), controller.registration);
// отримуємо токен
router.post("/login", () => {
  // знайти користувача за Email
  // Валідація всіх обов'язкових полів
  // Порівняти введений пароль та пароль знайденого користувача
  // якщо паролі збігаються, створити токен
  // повернути успішну відповідь
  // якщо пароль або Емейл невірний повернути 401 Unauthorized
});
//
// router.post();
// =================================================================
module.exports = router;
