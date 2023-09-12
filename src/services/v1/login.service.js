const boom = require("@hapi/boom");
const pool = require("../../libs/postgres");
const { Users } = require("../../db/models/v1/Users.model");

class LoginService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) =>
      console.error("Error en el pool de conexión: ", err)
    );
  }

  async login({ Username, Password }) {
    try {
      const userLogin = await Users.findOne({
        where: {
          Username,
          Password,
        },
      });
      console.log({ userLogin });
      if (userLogin === null) throw boom.notFound("Usuario no encontrado");

      return userLogin;
    } catch (error) {
      console.log(error.output);

      if (error.output.statusCode === 404) throw error;
      else throw boom.badGateway("Error al consultar usuario");
    }
  }
}

module.exports = LoginService;
