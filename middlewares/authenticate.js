const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const { UserModel } = require("../dbService/models/authSchema");
require("colors");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY); // повертає об'єкт розшифрованих даних
    const user = await UserModel.findById(id); // перевіряємо чи досі цей користувач є в базі
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user; // записуємо поточного користувача в запити
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
