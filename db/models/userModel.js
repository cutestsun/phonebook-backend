const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "number is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
