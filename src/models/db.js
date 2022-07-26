const mongoose = require("mongoose");

const connect = async () => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

  const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  await mongoose.connect(mongoURI, {
    user: DB_USERNAME,
    pass: DB_PASSWORD
  });
};

module.exports = { connect };
