const ContactModel = require("../dbService/models/dbSchema");

const EmailController = async (data) => {
  const user = await ContactModel.find({ email: data.email });
  const isActive = user.find((obj) => obj.isDeleted === false);
  if (user && isActive) {
    return true;
  }
  return false;
};

module.exports = EmailController;
