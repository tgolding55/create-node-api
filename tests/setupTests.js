const mongoose = require("mongoose");
const db = require("../src/models/db");

require("dotenv").config({ path: "./test.env" });

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = () => {
  before(async () => {
    await db.connect();

    const conn = mongoose.createConnection(mongoURI);

    await conn.dropDatabase();
  });

  afterEach(async () => {
    const conn = mongoose.createConnection(mongoURI);

    await conn.dropDatabase();
  });
};
