const mongooseError = (error, data, next) => {
  if (error.code === 11000) {
    error.status = 409;
    error.message = "Email already Exists";
    next();
  } else {
    error.status = 400;
    next();
  }
};

module.exports = mongooseError;
