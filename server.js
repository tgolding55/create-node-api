const express = require("express");
const cors = require("cors");

const app = express();

switch (process.env.NODE_ENV) {
  case "dev":
    envPath = "./dev.env";
    break;
  default:
    envPath = "./.env";
    break;
}

require("dotenv").config({ path: envPath });

app.use(cors());
app.use(express.json());

const userRouter = require("./src/routes/User.routes");

app.use("/v1/users", userRouter);

module.exports = app;
