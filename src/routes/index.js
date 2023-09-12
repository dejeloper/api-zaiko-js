const express = require("express");

const personsRouterv0 = require("./api/v0/persons.router");

function routerApi(app) {
  const routerv0 = express.Router();
  app.use("/api/v0", routerv0);
  routerv0.use("/persons", personsRouterv0);
}

module.exports = routerApi;
