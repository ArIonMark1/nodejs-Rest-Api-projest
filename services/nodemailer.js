const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = require("../helpers/env");
const HttpError = require("../helpers/HttpError");

const config = {
  host: "smtp.meta.ua",
  port: "465", // 25, 465(захищений), 2525
  secure: true,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config); // об'єкт який займається відправкою пошти

const sendEmail = async (payload) => {
  try {
    const result = await transporter.sendMail(payload);
    console.log("Message sent: %s", result);
    return result;
  } catch (error) {
    throw HttpError(403, `Mail server error: ${error.message}`);
  }
};
// sendEmail();
module.exports = { sendEmail };
