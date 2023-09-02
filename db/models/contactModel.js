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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
