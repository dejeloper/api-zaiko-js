const express = require("express");

const personsRouterv1 = require("./api/v1/persons.router");

function routerApi(app) {
  const routerv1 = express.Router();
  app.use("/api/v1", routerv1);

  routerv1.use("/persons", personsRouterv1);
}

module.exports = routerApi;
