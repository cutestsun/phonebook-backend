require("dotenv").config();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const User = require("../db/models/userModel");

const { SECRET_KEY } = process.env;

const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "User already exists in database" });
    return;
  }

  const avatar = gravatar.url(email);
  const newUser = new User({ name, email, password, avatar });
  await newUser.hashPassword(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    user: {
      name,
      email,
      avatar,
    },
    token,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      name: user.name,
      email,
      avatar: user.avatar,
    },
    token,
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const currentUserController = async (req, res) => {
  const { email, name, avatar } = req.user;

  res.json({
    email,
    name,
    avatar,
  });
};

module.exports = {
  signUpController,
  loginController,
  logoutController,
  currentUserController,
};
