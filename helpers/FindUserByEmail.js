const ContactModel = require("../dbService/models/dbSchema");

const FindUserByEmail = async (data) => {
  const user = await ContactModel.find({ email: data.email, isDeleted: false });

  if (!user.length) {
    return false;
  }
  return true;
};

module.exports = FindUserByEmail;
