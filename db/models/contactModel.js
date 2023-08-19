const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    number: {
      type: String,
      required: [true, "number is required"],
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
