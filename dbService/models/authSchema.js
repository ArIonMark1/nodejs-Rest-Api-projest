const { Schema, model } = require("mongoose");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      match: [emailControl, "Please fill a valid email address"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { timestamps: true, validateBeforeSave: true, versionKey: false }
);

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
};
