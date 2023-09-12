const { Persons, PersonsSchema } = require("./Persons.model");

// v1
const { UsersModel, UsersSchema } = require("./v1/Users.model");

function setupModels(sequelize) {
  Persons.init(PersonsSchema, Persons.config(sequelize));

  // v1
  UsersModel.init(UsersSchema, UsersModel.config(sequelize));
}

module.exports = { setupModels };
