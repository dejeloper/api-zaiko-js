const { Sequelize } = require("sequelize");
const URI = require("./URI");
const { setupModels } = require("../db/models");

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
