const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../dbService/authRequests");

// const UserModel = require("../db/models/user");

// services ********************************
const createUser = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await userRepository.register({
    ...data,
    password: passwordHash,
  });
  return user;
};

module.exports = { createUser };
