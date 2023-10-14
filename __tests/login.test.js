/* 
Написати unit-тести для контролера входу (логін)
За допомогою Jest

    відповідь повина мати статус-код 200
    у відповіді повинен повертатися токен
    у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { login } = require("../controller/userController"); // Підключення функції логінізації
const userService = require("../services/users"); // Підключення модуля userService
const HttpError = require("../helpers/HttpError"); //

jest.mock("../services/users"); // Мокуємо userService

describe("second loggedInUser function".bgYellow.black, () => {
  const mockUser = {
    _doc: {
      _id: "651a8e20e1eb26bb8c60ec6e",
      firstName: "Zorro",
      lastName: "Hunter",
      email: "killer123@gmail.com",
      password: "$2b$10$O6OZSA5BeikK/jrWpS1mguhckszEUY5ba16cUQY2Ztg.jkJHBm14O",
      subscription: "starter",
      avatarURL:
        "C:\\Users\\andre\\Desktop\\projects_Node\\lesson-2\\nodejs-Rest-Api-projest\\public\\avatars\\651a8e20e1eb26bb8c60ec6e_avatar_zoro.jpg",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWE4ZTIwZTFlYjI2YmI4YzYwZWM2ZSIsImZpcnN0TmFtZSI6IlpvcnJvIiwibGFzdE5hbWUiOiJIdW50ZXIiLCJpYXQiOjE2OTY1MTg2MTMsImV4cCI6MTY5NjUyNTgxM30.ZNCKAgNREYsrB77vqRbmnLfcogV0WBsjD1d2lK4VpsA",
    },
  };

  it(" success login test ".bgGreen.black, async () => {
    jest
      .spyOn(userService, "loggedInUser")
      .mockImplementationOnce((userData) => ({ ...userData, ...mockUser })); // типу повертає фейковий об'єкт з даними
    //
    const req = getMockReq({
      body: { email: "killer123@gmail.com", password: "123456Ad" },
    }); // дані користувача який логіниться

    const { res, next } = getMockRes();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200); // контролюємо статус
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 200,
        message: "User logged in successfully",
      })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          _id: "651a8e20e1eb26bb8c60ec6e",
          firstName: "Zorro",
          lastName: "Hunter",
          email: "killer123@gmail.com",
          subscription: "starter",
          avatarURL:
            "C:\\Users\\andre\\Desktop\\projects_Node\\lesson-2\\nodejs-Rest-Api-projest\\public\\avatars\\651a8e20e1eb26bb8c60ec6e_avatar_zoro.jpg",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWE4ZTIwZTFlYjI2YmI4YzYwZWM2ZSIsImZpcnN0TmFtZSI6IlpvcnJvIiwibGFzdE5hbWUiOiJIdW50ZXIiLCJpYXQiOjE2OTY1MTg2MTMsImV4cCI6MTY5NjUyNTgxM30.ZNCKAgNREYsrB77vqRbmnLfcogV0WBsjD1d2lK4VpsA",
        },
      })
    );
  }); // complete
  // ************************************************************************************************
  //
  it("empty field forn login".bgGreen.black, async () => {
    jest.spyOn(userService, "loggedInUser").mockImplementationOnce(() => false); // response = false
    //
    const req = getMockReq({
      body: { email: "killer123@gmail.com", password: "123456Ad" },
    }); // дані користувача який логіниться
    const { res, next } = getMockRes();
    //
    await login(req, res, next);
    //
    expect(next).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 401,
        message: "Wrong user data!.",
      })
    );
  });
  // ************************************************************************************************
  //
  it("control type of received data".bgGreen.black, async () => {
    jest
      .spyOn(userService, "loggedInUser")
      .mockImplementationOnce((userData) => ({ ...userData, ...mockUser })); // типу повертає фейковий об'єкт з даними

    const req = getMockReq({
      body: { email: "killer123@gmail.com", password: "123456Ad" },
    }); // дані користувача який логіниться
    const { res, next } = getMockRes();
    // ***************************
    await login(req, res, next);
    // ***************************
    expect(res.json).toHaveBeenCalledWith(expect.any(Object)); // перевіряє чи відповідь повертає об'єкт
    //
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: expect.any(Number),
        message: expect.any(String),
        data: expect.any(Object),
      })
    ); // перевіряє типи даних в об'єкті який прийшов у відповіді
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          _id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          subscription: expect.any(String),
          avatarURL: expect.any(String),
          token: expect.any(String),
        },
      })
    ); // перевіряє типи даних у вкладеному об'єкті
  });
});

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
