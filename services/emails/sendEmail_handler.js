const { sendEmail } = require("../nodemailer");
const Handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const { EMAIL_ADDRESS, BASE_URL } = require("../../helpers/env");
const HttpError = require("../../helpers/HttpError");
require("colors");

const registrationEmail = async ({ firstName, email, verificationToken }) => {
  // шаблон
  const templateSource = await fs.readFile(
    path.join(__dirname, "templates", "email_template.html"),
    "utf8"
  );
  // шаблон КОМПІЛЮЄМО
  const template = Handlebars.compile(templateSource);
  // передаємо дані в шаблон
  const output = template({
    name: firstName,
    link: `${BASE_URL}/api/users/verify/${verificationToken}`,
  });
  // передаємо шаблон та інші дані відправнику

  try {
    await sendEmail({
      from: EMAIL_ADDRESS,
      to: email,
      subject: "Confirm registration",
      html: output,
    });
  } catch (error) {
    throw HttpError(error.status, error.message);
  }
};

module.exports = { registrationEmail };
