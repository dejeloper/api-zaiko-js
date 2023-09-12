const express = require("express");

const personsRouterv0 = require("./api/v0/persons.router");

const loginRouterv1 = require("./api/v1/login.router");

function routerApi(app) {
  const routerv0 = express.Router();
  app.use("/api/v0", routerv0);
  routerv0.use("/persons", personsRouterv0);

  const routerv1 = express.Router();
  app.use("/api/v1", routerv1);
  routerv1.use("/login", loginRouterv1);
}

module.exports = routerApi;
