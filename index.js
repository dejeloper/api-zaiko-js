import express, { json } from "express";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from "./src/middlewares/error.handler.js";

const app = express();
const port = 3000;

app.use(json());

app.get("/", (req, res) => {
  res.send("Api backend Zaiko");
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Corriendo en el puerto: " + port);
});

export default app;
