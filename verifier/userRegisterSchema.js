const Joi = require("joi");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const RegisterSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailControl).required(),
  password: Joi.string().min(6).required(),
});

module.exports = RegisterSchema;
