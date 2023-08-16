const boom = require("@hapi/boom");
const pool = require("../../libs/postgres");
const sequelize = require("../../libs/sequelize");
const { Persons } = require("../../db/models/Persons.model");

class PersonsService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) =>
      console.error("Error en el pool de conexión: ", err)
    );
  }

  async createPerson(paramsNewPersons) {
    try {
      const newPerson = await Persons.create(paramsNewPersons);

      return newPerson;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }

  async getAllPersonsEnabled() {
    try {
      const query = `SELECT * FROM public.getAllPersonsEnabled();`;
      const [data] = await sequelize.query(query);
      const persons = data;

      if (persons.length <= 0) throw boom.notFound("Persons not found");

      return persons;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }
}

module.exports = PersonsService;
