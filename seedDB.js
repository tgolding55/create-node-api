const mongoose = require("mongoose");
const db = require("./src/models/db");
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
  const { DB_HOST, DB_NAME, DB_PORT } = process.env;

  const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  await db.connect();

  const conn = mongoose.createConnection(mongoURI);

  console.log("Dropping database...");
  await conn.dropDatabase();

  console.log("Seeding...");
  await seed();

  await mongoose.disconnect();
};

seedDB();
