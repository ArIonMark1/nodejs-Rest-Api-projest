const { Schema, model } = require("mongoose");
const mongooseError = require("../../helpers/handleMongooseErr");

const emailControl = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
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
    avatarURL: {
      type: String,
      default: " ",
    },
    token: { type: String, default: "" },
  },
  { timestamps: true, validateBeforeSave: true, versionKey: false }
);

userSchema.post("save", mongooseError); // запис означає що коли сталася помилк то спрацює ця middleware

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
};
