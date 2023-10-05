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
    const mockUser = {
      _doc: { email: "killer123@gmail.com", password: "123456Ad" },
    };
    //
    const req = getMockReq({
      body: { email: "killer123@gmail.com", password: "123456Ad" },
    }); // дані користувача який логіниться
    const { res, next } = getMockRes();
    //
    const fakeData = jest.fn().mockResolvedValue(mockUser);

    const useData = (userService.loggedInUser = fakeData); // фейкова відповідь від бази ????
    await login(req, res, next); // тут ясно - виклик функції
    console.log("USER DATA: ".bgRed, useData._doc);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
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
  // test("login with wrong user data", async () => {
  //   const req = { body: { username: "testuser", password: "wrongpassword" } };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   userService.loggedInUser.mockResolvedValueOnce(null);

  //   await login(req, res, next);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res).toHaveBeenCalledWith({
  //     status: 400,
  //     message: 'Not correct data. "email" is required',
  //   });
  //   expect(next).not.toHaveBeenCalled();
  // });
  // =================================================================
  // test("login with error", async () => {
  //   const req = { body: { username: "testuser", password: "password123" } };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   const next = jest.fn();

  //   const error = new HttpError(500, "Internal Server Error");
  //   userService.loggedInUser.mockRejectedValueOnce(error);

  //   await login(req, res, next);

  //   expect(next).toHaveBeenCalledWith(error);
  //   expect(res.status).not.toHaveBeenCalled();
  //   expect(res.json).not.toHaveBeenCalled();
  // });
});

// =================================================================
// =================================================================

describe(" tests to control shopping list ".bgYellow.black, () => {
  const shoppingList = [
    "Axe",
    "bread",
    "sausages",
    "car",
    "dynamite",
    { a: 1, b: 2, c: 3, d: 4, e: 5 },
  ];
  // =================================================================
  it(" Is controlling shoping list contain Axe ".bgGreen.black, () => {
    expect(shoppingList).toContain("Axe");
  });
  it(" Shoping list is not contain milk ".bgGreen.black, () => {
    expect(shoppingList).not.toContain("Milk");
  });
  it(" Is size of list more than 5 ".bgGreen.black, () => {
    const size = shoppingList.length;
    expect(size).toBeGreaterThan(5);
  });
  it(" Is contain object {}".bgGreen.black, () => {
    const isObject = shoppingList.find(
      (element) => typeof element === "object"
    );
    expect(isObject).toBeTruthy();
  });
  it(" Is not contain array []".bgGreen.black, () => {
    const isObject = shoppingList.find((element) => typeof element === "array");
    expect(isObject).toBeFalsy();
  });

  it(" Is contain object { a: 1 }".bgGreen.black, () => {
    // чи є об'єкт у масиві
    const isObject = shoppingList.find(
      (element) => typeof element === "object"
    );
    expect(isObject).toBeTruthy();
    // чи очікувані дані в об'єкті співпадають з даними знайденого об'єкта
    expect(isObject).toMatchObject({ a: 1 });
  });
});
