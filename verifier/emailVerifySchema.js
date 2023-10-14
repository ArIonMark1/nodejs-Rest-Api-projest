const Joi = require("joi");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emailVerifySchema = Joi.object({
  email: Joi.string().pattern(emailControl).required(),
});

module.exports = emailVerifySchema;
