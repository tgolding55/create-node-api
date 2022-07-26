const mongoose = require("mongoose");
require("dotenv").config({ path: "./test.env" });

module.exports = () => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

  const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  before(async () => {
    await mongoose.connect(mongoURI, {
      user: DB_USERNAME,
      pass: DB_PASSWORD
    });

    const conn = mongoose.createConnection(mongoURI);

    await conn.dropDatabase();
  });

  afterEach(async () => {
    const conn = mongoose.createConnection(mongoURI);

    await conn.dropDatabase();
  });
};
