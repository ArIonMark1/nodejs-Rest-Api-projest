const { sendEmail } = require("../nodemailer");
const Handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const { EMAIL_ADDRESS, BASE_URL } = require("../../helpers/env");
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
  // console.log(`${output.link}`.bgYellow);
  // console.log(`${verificationToken}`.bgWhite);
  await sendEmail({
    from: EMAIL_ADDRESS,
    to: email,
    subject: "Confirm registration",
    html: output,
  });
};

module.exports = { registrationEmail };
