const { Router } = require("express");
const userModel = require("../../dbService/models/authSchema");
const LoginSchema = require("../../verifier/userLoginSchema");
const RegisterSchema = require("../../verifier/userRegisterSchema");
const router = new Router();
//реєстрація нового користувача
router.post(
  "/register",
  RegisterSchema.validate(userModel),
  async (req, res, next) => {
    const { body } = req;
    try {
      const user = await usersService.create(body);
      console.log(body);
    } catch (error) {}
  }
);
// отримуємо токен
router.post("/login", () => {});
//
// router.post();
module.exports = routes;
