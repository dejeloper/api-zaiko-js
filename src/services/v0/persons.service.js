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

      if (person !== null) throw boom.conflict("Persona ya existe");

      const newPerson = await Persons.create(paramsNewPersons);

      return newPerson;
    } catch (error) {
      if (error.output.statusCode === 409) throw error;
      else throw boom.badGateway("Error al crear persona");
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
      if (error.output.statusCode === 404) throw error;
      else throw boom.badGateway("Error al consultar personas");
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
      if (error.output.statusCode === 404) throw error;
      else throw boom.badGateway("Error al consultar personas");
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

      if (numUpdatedRows === 0) throw boom.badData("Persona no actualizada");

      return updatedPersons;
    } catch (error) {
      if (error.output.statusCode === 404) throw error;
      else if (error.output.statusCode === 422) throw error;
      else throw boom.badGateway("Error al consultar personas");
    }
  }
}

module.exports = PersonsService;
