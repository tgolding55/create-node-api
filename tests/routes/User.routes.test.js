const request = require("supertest");
const expect = require("expect.js");
const jwt = require("jsonwebtoken");

const User = require("../../src/models/User.models");
const errors = require("../../src/errors/errors.constants");

const app = require("../../server");

const setupTests = require("../setupTests");
setupTests();

describe("/users", () => {
  describe("POST /", () => {
    describe("and the user data is valid", () => {
      let response;
      const userData = { username: "username", password: "password" };

      beforeEach(async () => {
        response = await request(app)
          .post("/v1/users")
          .send(userData)
          .set("Accept", "application/json")
          .set("Content-Type", "application/json");
      });
      it("returns 200", () => {
        expect(response.statusCode).to.be(200);
      });

      it("returns a user", () => {
        expect(response.body.user.username).to.equal(userData.username);
      });

      it("creates a user", async () => {
        const user = await User.findOne({ _id: response.body.user._id });
        expect(!!user).to.be(true);
      });

      describe("and the user already exists", () => {
        beforeEach(async () => {
          response = await request(app)
            .post("/v1/users")
            .send(userData)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");
        });

        it(`returns a ${errors.usernameTaken.status}`, () => {
          expect(response.statusCode).to.be(errors.usernameTaken.status);
        });
      });
    });
  });
  describe("POST /login/", () => {
    let response, user;
    const userData = { username: "username", password: "password" };

    beforeEach(async () => {
      user = await User.create(userData);

      response = await request(app)
        .post("/v1/users/login")
        .send(userData)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");
    });

    it("returns 200", () => {
      expect(response.statusCode).to.be(200);
    });

    it("returns the user", () => {
      expect(response.body.user._id.toString()).to.equal(user._id.toString());
    });

    it("returns a valid auth token", () => {
      const { _id } = jwt.verify(response.body.token, process.env.JWT_SECRET);

      expect(_id).to.equal(user._id.toString());
    });
  });
});
