const { Persons, PersonsSchema } = require("./Persons.model");

function setupModels(sequelize) {
  Persons.init(PersonsSchema, Persons.config(sequelize));
}

module.exports = { setupModels };
