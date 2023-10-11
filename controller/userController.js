const userService = require("../services/users");
const HttpError = require("../helpers/HttpError");
const { updateAvatar } = require("../dbService/authRequests");
const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");
const { sendEmail } = require("../services/nodemailer");
require("colors");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registration = async (req, res, next) => {
  try {
    const { body } = req;
    await userService.createUser(body);

    res.status(201).json({
      status: 201,
      message: `Your account has been registered, please confirm your registration using the email we sent you.`,
    });
  } catch (error) {
    next(error);
  }
};
/*
1 При закінченні реєстрації відправляємо листа
2 Робимо редірект на сторінку із сповіщенням що був відправлений лист для підтвердження реєстрації
3 При переході по лінкі із листа попадаємо на роут(юрл) підтвердження токену
4 В залежності від успішності підтвердження токену генеруємо сповіщення (200 або 404)

*/
const login = async (req, res, next) => {
  try {
    const loginUser = await userService.loggedInUser(req.body); //
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
      data: userData,
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
const userVerification = async (req, res, next) => {
  try {
    // шукаємо користувача по токену
    // поле verify = true а verificationToken видаляємо
    const { verificationToken } = req.params;
    const registeredUser = await userService.handleVerification(
      verificationToken
    );
    const {
      password,
      verificationToken: regToken,
      token,
      ...data
    } = registeredUser;
    console.log("VERIFICATION COMPLETED: ".bgGreen, registeredUser);

    res.status(200).json({
      status: 200,
      message: "Registration successfully confirmed",
      data: data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registration,
  login,
  current,
  logout,
  handleAvatar,
  userVerification,
};
