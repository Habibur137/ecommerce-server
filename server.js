require("dotenv").config();
const app = require("./app/app");
const connectionDB = require("./db/connectionDB");
const port = process.env.PORT || 8000;
connectionDB();

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
