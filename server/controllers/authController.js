const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already in use", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already in use", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.json({ msg: "Incorrect username or password", status: false });
    delete user.password;
    return res.json({ user, status: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, login };
