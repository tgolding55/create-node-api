const jwt = require("jsonwebtoken");
const expect = require("expect.js");
const User = require("../../src/models/User.models");

const setupTests = require("../setupTests");
setupTests();

describe("User", () => {
  let user;
  const userData = { username: "username", password: "password" };
  beforeEach(async () => {
    user = await User.create(userData);
  });

  it("sets the `username`", () => {
    expect(user.username).to.equal(userData.username);
  });

  describe("sets the `password`", () => {
    it("exists", () => {
      expect(!!user.password).to.be(true);
    });
    it("will not equal the password input", () => {
      expect(user.password).not.to.equal(userData.password);
    });
  });

  describe("validPassword()", () => {
    it("returns true for the correct `password`", () => {
      const comparison = user.validPassword(userData.password);
      expect(comparison).to.be(true);
    });
    it("returns false for a incorrect `password`", () => {
      const comparison = user.validPassword(userData.password + "-incorrect");
      expect(comparison).to.be(false);
    });
  });

  describe("generateAuthToken()", () => {
    it("returns a valid auth token", () => {
      const authToken = user.generateAuthToken();

      const { _id } = jwt.verify(authToken, process.env.JWT_SECRET);

      expect(_id).to.equal(String(user._id));
    });
  });
});
