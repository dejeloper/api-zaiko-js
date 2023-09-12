const boom = require("@hapi/boom");

const { validateLogin } = require("../../schemas/v1/loginSchema");

const LoginService = require("../../services/v1/login.service");

const { generateErrorMessage } = require("../../schemas/utils/getStringErrors");

const service = new LoginService();

async function login(req, res, next) {
  try {
    const resValidateLogin = validateLogin(req.body);
    if (resValidateLogin.error) {
      const errorObj = generateErrorMessage(resValidateLogin);
      throw boom.badData(errorObj);
    }

    const paramsLogin = {
      ...resValidateLogin.data,
    };

    const login = await service.login(paramsLogin);

    const responseLogin = {
      success: true,
      data: login,
      message: "Login correcto",
      count: 1,
    };

    res.status(200).json(responseLogin);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
