const mongoose = require("mongoose");

const {
  MONGO_DB_USER,
  MONGO_DB_USER_PASSWORD,
  MONGO_DB_DATABASE,
} = require("./env");

const setupConnection = async () => {
  try {
    const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_USER_PASSWORD}@tutorialfree.ko7nev0.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", true);
    const res = await mongoose.connect(uri); // return Promise
    console.log(`Database connection successful`.cyan);
    return res;
  } catch (error) {
    throw new Error(`ERROR!!! ${error.message}`);
  }
};

module.exports = setupConnection;
