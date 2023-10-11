const { sendEmail } = require("../nodemailer");
const Handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises();
const path = require("path");
const { EMAIL_ADDRESS, SECRET_KEY } = require("../../helpers/env");

const registrationEmail = async (to) => {
  const templateSource = await fs.readFile(
    path.join(__dirname, "templates", "email_template.html"),
    "utf8"
  );

  const template = Handlebars.compile(templateSource);
  //
  const user = "найти юзера в базі по емейлу";
  const token = jwt.sign();
  //

  const output = template({
    name: user.name,
    link: "",
  });

  await sendEmail({
    from: EMAIL_ADDRESS,
    to,
    subject: "Confirm registration",
    html: output,
  });
};

module.exports = { registrationEmail };
