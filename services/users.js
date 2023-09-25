const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../dbService/authRequests");
const { SECRET_KEY } = require("../helpers/env");
const HttpError = require("../helpers/HttpError");
const { UserModel } = require("../dbService/models/authSchema");
require("colors");
// const UserModel = require("../db/models/user");

// services ********************************
const createUser = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await userRepository.register({
    ...data,
    password: passwordHash,
  });
  return user;
};

const loggedInUser = async (data) => {
  const { email, password } = data;
  // перевірка даних для логіну, чи маємо в базі користувача з таким емейлом
  const request = await userRepository.login(email);
  //
  if (!request) {
    return false;
  }
  //  перевірка співпадіння паролів
  // const dbPass = request.password;
  const { id, firstName, lastName, password: hashPass } = request;
  const controlPass = await bcrypt.compare(password, hashPass);
  //
  if (!controlPass) {
    return false;
  }
  // Створюємо токен залогіненого користувача
  const payload = { id, firstName, lastName };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" }); // token for 2 hours
  await UserModel.findByIdAndUpdate(id, { token });
  //
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    if (!id) {
      throw HttpError(401);
    }
    return { ...request, _doc: { ...request._doc, token } }; // { '$__': {}, '': val, _doc: {} }
  } catch (error) {
    return {
      error: { status: error.status, message: `Token ${error.message}` },
    };
  }
};
const logout = async (id) => {
  return await userRepository.logout(id);
};
module.exports = { createUser, loggedInUser, logout };
