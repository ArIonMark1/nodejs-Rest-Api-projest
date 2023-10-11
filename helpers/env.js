require("dotenv").config();

const {
  MONGO_DB_USER,
  MONGO_DB_USER_PASSWORD,
  MONGO_DB_DATABASE,
  SECRET_KEY,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
} = process.env;

if (!MONGO_DB_USER) {
  throw new Error("Please setup MONGO_DB_USER variable");
}
if (!MONGO_DB_USER_PASSWORD) {
  throw new Error("Please setup MONGO_DB_USER_PASSWORD variable");
}
if (!MONGO_DB_DATABASE) {
  throw new Error("Please setup MONGO_DB_DATABASE variable");
}
if (!SECRET_KEY) {
  throw new Error("Required SECRET_KEY variable");
}
if (!EMAIL_ADDRESS) {
  throw new Error("Required EMAIL_ADDRESS variable");
}
if (!EMAIL_PASSWORD) {
  throw new Error("Required EMAIL_PASSWORD variable");
}
module.exports = {
  MONGO_DB_USER,
  MONGO_DB_USER_PASSWORD,
  MONGO_DB_DATABASE,
  SECRET_KEY,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
};
