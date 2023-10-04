/* 
Написати unit-тести для контролера входу (логін)
За допомогою Jest

    відповідь повина мати статус-код 200
    у відповіді повинен повертатися токен
    у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/
const { getMockReq, getMockRes } = require("@jest-mock/express");
const userService = require("../services/users"); // Підключення вашого модуля userService, якщо потрібно
const HttpError = require("../services/users"); // Якщо HttpError - це окремий модуль, підключіть його

const { login } = require("../controller/userController"); // Підключення функції логінізації

jest.mock("../services/users"); // Мокуємо userService, якщо це потрібно/ ХТО ТИ ТВАРЮКО??!!!

require("colors");

// // =================================================================
describe("loggedInUser function", () => {
  it("My own login Test", async () => {
    //
    const req = getMockReq({
      body: { email: "killer123@gmail.com", password: "123456Ad" },
    });
    const { res, next } = getMockRes();
    const mockUser = {
      _doc: { username: "testuser", password: "password123" },
    };
    //
    userService.loggedInUser = jest.fn().mockResolvedValue(mockUser); // mockResolvedStonedMarmok - як це зрозуміти
    // це типу що?! ми б-ть предаємо фейк дані чи б-ть отримуємо, що це б-ть таке??!
    // у мене ця "" приймає боді, якого туди док пихати ???!!!

    await login(req, res, next); // тут ясно - виклик функції

    expect(true).toBe(true);
    expect(res.status).toHaveBeenCalledWith(200);
    // тут перевіряємо що б-ть прийшло але чого не " toWalkinForrestToFindSomeMirracleMushroomToCompare" метод??!!
  });
});

describe("tested test", () => {
  it("test", () => {
    expect(true).toBe(true);
  });
});
// =================================================================
// =================================================================

describe("Login function", () => {
  // =================================================================
  test("successful login", async () => {
    const req = { body: { username: "testuser", password: "password123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockUser = {
      _doc: { username: "testuser", password: "password123" },
    };
    userService.loggedInUser.mockResolvedValueOnce(mockUser);

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "User logged in successfully",
      data: { userData: { username: "testuser" } },
    });
    expect(next).not.toHaveBeenCalled();
  });
  // =================================================================
  test("login with wrong user data", async () => {
    const req = { body: { username: "testuser", password: "wrongpassword" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    userService.loggedInUser.mockResolvedValueOnce(null);

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res).toHaveBeenCalledWith({
      status: 400,
      message: 'Not correct data. "email" is required',
    });
    expect(next).not.toHaveBeenCalled();
  });
  // =================================================================
  test("login with error", async () => {
    const req = { body: { username: "testuser", password: "password123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const error = new HttpError(500, "Internal Server Error");
    userService.loggedInUser.mockRejectedValueOnce(error);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
