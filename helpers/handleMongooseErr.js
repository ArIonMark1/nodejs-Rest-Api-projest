require("colors");
const mongooseError = (error, data, next) => {
  console.log("ERROR: ".red, error.code);

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
