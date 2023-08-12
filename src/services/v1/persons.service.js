const boom = require("@hapi/boom");
const pool = require("../../libs/postgres");
const { models } = require("../../libs/sequelize");
const { Op } = require("sequelize");

class PersonsService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) =>
      console.error("Error en el pool de conexión: ", err)
    );
  }

  async find() {
    try {
      // const query = `SELECT * FROM public."Persons"`;
      // const [data] = await sequelize.query(query);
      // const persons = data;
      const persons = await models.Persons.findAll({
        where: {
          LastName: {
            [Op.like]: "%n",
          },
          State: 1001,
        },
      });

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
