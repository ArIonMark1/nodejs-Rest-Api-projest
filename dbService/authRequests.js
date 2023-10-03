const { UserModel } = require("./models/authSchema");

const register = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};
const login = async (email) => {
  //
  return await UserModel.findOne({ email }, "-createdAt -updatedAt -email");
};

const logout = async (id) => {
  return await UserModel.findByIdAndUpdate(id, { token: "" });
};
//
const updateAvatar = async (_id, avatarURL) => {
  return await UserModel.findOneAndUpdate(
    { _id },
    { avatarURL },
    { new: true }
  );
};

module.exports = {
  register,
  login,
  logout,
  updateAvatar,
};
