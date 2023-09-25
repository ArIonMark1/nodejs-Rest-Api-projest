const { UserModel } = require("./models/authSchema");

const register = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};
const login = async (email) => {
  //
  return await UserModel.findOne({ email });
};

const logout = async (id) => {
  return await UserModel.findByIdAndUpdate(id, { token: "" });
};

module.exports = {
  register,
  login,
  logout,
};
