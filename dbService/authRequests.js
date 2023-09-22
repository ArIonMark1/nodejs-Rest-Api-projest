const { UserModel, authSchema } = require("./models/authSchema");

const create = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};

module.exports = {
  create,
};
