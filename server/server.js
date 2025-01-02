const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 9000;
app.use(
  cors()
);
app.use(express.json());
app.use(require("./routes/record"));
app.get("/", function (req, res) {
  res.send("App is running");
});
const dbo = require("./db/conn");


dbo.connectToMongoDB(function (error) {
  if (error) throw error;
console.log("the server is running");
});
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
