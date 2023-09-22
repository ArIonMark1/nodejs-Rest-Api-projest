const Joi = require("joi");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const CreateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailControl).required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean(),
});

const UpdateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().min(10),
  favorite: Joi.boolean(),
});

module.exports = {
  CreateContact,
  UpdateContact,
};
