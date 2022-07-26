const User = require("../src/models/User.models");

const seed = async () => {
  const defaultUserDetails = { username: "Admin", password: "Password" };
  const defaultUser = await User.create(defaultUserDetails);

  console.log(
    `Default user created - Username: ${defaultUser.username} | Password: ${defaultUserDetails.password}`
  );
};

module.exports = seed;
