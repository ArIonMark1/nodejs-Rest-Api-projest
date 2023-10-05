const userService = require("../services/users");
const HttpError = require("../helpers/HttpError");
const { updateAvatar } = require("../dbService/authRequests");
const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");
require("colors");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registration = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await userService.createUser(body);

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
    const loginUser = await userService.loggedInUser(req.body); //   _doc  !!!!??? wtf !!!??
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
const handleAvatar = async (req, res, next) => {
  const { description } = req.body;
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // зміна розміру аватарки
  const jimpAvatar = await Jimp.read(tempUpload);
  jimpAvatar.resize(250, 250).write(tempUpload);
  //
  const newAvatarName = `${id}_${originalname}`; // генерую унікальне ім'я для кожного користувача
  const avatarUpload = path.join(avatarDir, newAvatarName); // об'єднуємо шлях та нову назву файлу
  //
  try {
    await fs.rename(tempUpload, avatarUpload); // змінюємо старий шлях на новий(не повертає нічого)
  } catch (error) {
    await fs.unlink(tempUpload);
    return next(error);
  }
  //----------------------------------------------------------------
  const { avatarURL } = await updateAvatar(id, avatarUpload); //
  res.status(200).json({
    description,
    status: 200,
    message: "Avatar successfully updated",
    data: { avatarURL },
  });
};

module.exports = {
  registration,
  login,
  current,
  logout,
  handleAvatar,
};
