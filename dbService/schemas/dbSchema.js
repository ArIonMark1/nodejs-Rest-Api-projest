const { Schema, model } = require("mongoose"); // mongoose дозволяє описати структуру додавання контакту

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      lowercase: true,
      // =================================================================
      unique: true,
      //
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user && !user.isDeleted) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => "Incorrect Email address. Try again",
      },
      // =================================================================
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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, validateBeforeSave: true, versionKey: false }
);

const Contact = model("contacts", contactSchema);

module.exports = Contact;
