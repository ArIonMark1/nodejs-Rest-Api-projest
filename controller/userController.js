const userService = require("../services/users");
const HttpError = require("../helpers/HttpError");
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

const login = async (req, res, next) => {
  try {
    const loginUser = await userService.loggedInUser(req.body);

    if (loginUser.error) {
      throw HttpError(loginUser.error.status, loginUser.error.message);
    }
    if (!loginUser) {
      throw HttpError(401, "Wrong user data!.");
    }
    const { password, ...userData } = loginUser._doc;

    //
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: { userData },
    });
  } catch (error) {
    next(error);
  }
};
const current = async (req, res, next) => {
  try {
    const user = req.user;
    // console.log("Current".rainbow.bgCyan, req.user);
    //
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: { ...user._doc },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await userService.logout(id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  current,
  logout,
};
