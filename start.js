const app = require("./server");
const db = require("./src/models/db");

db.connect();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
