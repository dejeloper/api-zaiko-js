const boom = require("@hapi/boom");
const pool = require("../../libs/postgres");
const sequelize = require("../../libs/sequelize");

class PersonsService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) =>
      console.error("Error en el pool de conexión: ", err)
    );
  }

  async find() {
    try {
      const query = `SELECT * FROM public.getAllPersonsEnabled();`;
      const [data] = await sequelize.query(query);
      const persons = data;

      if (persons.length <= 0) throw boom.notFound("Persons not found");

      return {
        success: true,
        data: persons,
        message: "Ok",
        count: persons.length,
      };
    } catch (error) {
      throw boom.badGateway(error);
    }
  }
}

module.exports = PersonsService;
