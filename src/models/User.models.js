const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersSchema = mongoose.Schema({
  username: String,
  password: String
});

//Hooks
//-Hash Password
usersSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync();

  user.password = bcrypt.hashSync(user.password, salt);

  next();
});

//-Username unique
usersSchema.pre("save", async function(next) {
  const user = this;

  const userNotUnique = await mongoose
    .model("User")
    .findOne({ username: user.username });

  if (userNotUnique) {
    next("usernameTaken");
  }
  next();
});

//Instance Methods

usersSchema.methods.hashPassword = function() {
  const user = this;
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(user.password, salt);
};

usersSchema.methods.validPassword = function(matchPassword) {
  const user = this;
  return bcrypt.compareSync(matchPassword, user.password);
};

usersSchema.methods.generateAuthToken = function() {
  try {
    const user = this;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    throw new Error();
  }
};

//Static Methods

usersSchema.statics.findByCredentials = async function(userCredentials) {
  const db = this;
  const user = await db
    .model("User")
    .findOne({ username: userCredentials.username });

  if (!user) throw new Error("loginFailed");

  const isMatch = user.validPassword(userCredentials.password);

  if (!isMatch) throw new Error("loginFailed");

  return user;
};

module.exports = mongoose.model("User", usersSchema);
