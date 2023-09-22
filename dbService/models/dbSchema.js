const { Schema, model } = require("mongoose"); // mongoose дозволяє описати структуру додавання контакту
const mongooseError = require("../../helpers/handleMongooseErr");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      lowercase: true,
      // unique: true, Унікальне поле не потрібно так як йдеперевірка через поле isDeleted
      required: [true, "Set email for contact"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      min: 10,
      max: 13,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, validateBeforeSave: true, versionKey: false }
);

contactSchema.post("save", mongooseError); // запис означає що коли сталася помилк то спрацює ця middleware

const Contact = model("contact", contactSchema);

module.exports = Contact;
