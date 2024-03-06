const express = require("express");
const app = express();
const route = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(route);

app.listen(3000, () => {
  console.log("server running");
});
