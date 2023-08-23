const boom = require("@hapi/boom");
const pool = require("../../libs/postgres");
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
      const person = await Persons.findOne({
        where: {
          DocumentNumber: paramsNewPersons.DocumentNumber,
        },
      });

      if (person !== null) throw boom.notFound("Persona ya existe");

      const newPerson = await Persons.create(paramsNewPersons);

      return newPerson;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }

  async getAllPersonsEnabled() {
    try {
      const persons = await Persons.findAll({
        where: {
          Enabled: true,
        },
      });

      if (persons.length <= 0) throw boom.notFound("Personas no encontradas");

      return persons;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }

  async getPersonsById(Id) {
    try {
      const person = await Persons.findOne({
        where: {
          Id,
          Enabled: true,
        },
      });

      if (person === null) throw boom.notFound("Persona no encontrada");

      return person;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }

  async updatePerson(Id, paramsUpdatePerson) {
    try {
      const person = await Persons.findOne({
        where: {
          Id,
          Enabled: true,
        },
      });

      if (person === null) throw boom.notFound("Persona no encontrada");

      const [numUpdatedRows, updatedPersons] = await Persons.update(
        paramsUpdatePerson,
        {
          where: {
            Id,
          },
          returning: true,
        }
      );

      if (numUpdatedRows === 0) throw boom.notFound("Persona no actualizada");

      return updatedPersons;
    } catch (error) {
      throw boom.badGateway(error);
    }
  }
}

module.exports = PersonsService;
