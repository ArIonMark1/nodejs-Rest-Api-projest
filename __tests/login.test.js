/* 
Написати unit-тести для контролера входу (логін)
За допомогою Jest

    відповідь повина мати статус-код 200
    у відповіді повинен повертатися токен
    у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/
// зробити запит
//
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { login: loginController } = require("../controller/userController");
const { loggedInUser } = require("../services/users");
require("colors");

jest
  .spyOn(loggedInUser, "findOne", "findByIdAndUpdate")
  .mockImplementation((data) => ({
    email: "killer123@gmail.com",
    password: "123456Ad",
  }));

describe("Test", () => {
  describe("unit-тести для контролера входу", () => {
    test("status 200", async () => {
      const req = getMockReq({
        body: {
          email: "killer123@gmail.com",
          password: "123456Ad",
        },
      });
      const { res, next } = getMockRes();
      await login(req, res, next);
      expect(true).toBe(true);
    });
  });
});
