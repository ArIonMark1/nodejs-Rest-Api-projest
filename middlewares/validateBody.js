const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, `Not correct data. ${error.message}`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
