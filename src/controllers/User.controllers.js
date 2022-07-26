const User = require("../models/User.models");
const errorHandler = require("../errors/errorHandler");

exports.create_user = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    errorHandler({ err, res });
  }
};

exports.login_user = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    errorHandler({ err, res });
  }
};

exports.validate_user = async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (err) {
    errorHandler({ err, res });
  }
};
