const jwt = require("jsonwebtoken");
const User = require("../models/User.models");
const errorHandler = require("../errors/errorHandler");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    errorHandler({ err: "unauthorized", res });
  }
};

module.exports = auth;
