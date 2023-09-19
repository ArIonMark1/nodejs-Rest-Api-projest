require("dotenv").config();

const { MONGO_DB_USER, MONGO_DB_USER_PASSWORD, MONGO_DB_DATABASE } =
  process.env;

if (!MONGO_DB_USER) {
  throw new Error("Please setup MONGO_DB_USER variable");
}
if (!MONGO_DB_USER_PASSWORD) {
  throw new Error("Please setup MONGO_DB_USER_PASSWORD variable");
}
if (!MONGO_DB_DATABASE) {
  throw new Error("Please setup MONGO_DB_DATABASE variable");
}
module.exports = { MONGO_DB_USER, MONGO_DB_USER_PASSWORD, MONGO_DB_DATABASE };