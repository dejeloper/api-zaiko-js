const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api backend Zaiko");
});

app.listen(port, () => {
  console.log("Corriendo en el puerto: " + port);
});

module.exports = app;
