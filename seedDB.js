const mongoose = require("mongoose");
let seed;

switch (process.env.NODE_ENV) {
  case "prod":
    envPath = "./.env";
    seed = require("./seeds/seedProd");
    break;
  default:
    envPath = "./dev.env";
    seed = require("./seeds/seedDev");
    break;
}

require("dotenv").config({ path: envPath });

const seedDB = async () => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

  const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  await mongoose.connect(mongoURI, {
    user: DB_USERNAME,
    pass: DB_PASSWORD
  });

  const conn = mongoose.createConnection(mongoURI);

  console.log("Dropping database...");
  await conn.dropDatabase();

  console.log("Seeding...");
  await seed();

  await mongoose.disconnect();
};

seedDB();
