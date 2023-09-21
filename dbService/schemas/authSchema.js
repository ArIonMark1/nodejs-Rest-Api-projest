const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  fullName: {},
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Email is required"],
    match: [emailControl, "Please fill a valid email address"],
  },
  password: { type: String, required: [true, "Set password for user"] },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const userModel = model("users", userSchema);

module.exports = userModel;
