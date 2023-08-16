const express = require("express");
const cors = require("cors");
const option = require("./src/config/cors.js");
const routerApi = require("./src/routes/index.js");

const {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} = require("./src/middlewares/error.handler");
const sequelize = require("./src/libs/sequelize.js");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors(option));

app.get("/", (req, res) => {
  res.send("Api backend Zaiko");
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Corriendo en el puerto: " + port);
});

async function main() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = app;
