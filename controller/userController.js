// const HttpError = require("../helpers/HttpError");
const userService = require("../services/users");
require("colors");

const registration = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);

    console.log("NEW USER: ".magenta, newUser);

    res.status(201).json({
      status: 201,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
};
