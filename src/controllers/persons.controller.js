const boom = require("@hapi/boom");

const {
  validateCreatePerson,
  validatePartialPerson,
} = require("../schemas/personSchema");
const PersonsService = require("../services/v1/persons.service");
const { generateErrorMessage } = require("../schemas/utils/getStringErrors");
const service = new PersonsService();

async function createPerson(req, res, next) {
  try {
    const resValidateCreatePerson = validateCreatePerson(req.body);
    if (resValidateCreatePerson.error) {
      const errorObj = generateErrorMessage(resValidateCreatePerson);
      throw boom.badData(errorObj);
    }

    const paramsNewPersons = {
      ...resValidateCreatePerson.data,
    };

    const newPerson = await service.createPerson(paramsNewPersons);

    const responseNewPerson = {
      success: true,
      data: newPerson,
      message: "Persona creada correctamente",
      count: 1,
    };

    res.status(201).json(responseNewPerson);
  } catch (error) {
    next(error);
  }
}

async function getAllPersonsEnabled(req, res, next) {
  try {
    const persons = await service.getAllPersonsEnabled();

    const responsePersons = {
      success: true,
      data: persons,
      message: "Lista de Personas cargada correctamente",
      count: persons.length,
    };

    res.status(200).json(responsePersons);
  } catch (error) {
    next(error);
  }
}

async function getPersonsById(req, res, next) {
  try {
    const { id } = req.params;
    const persons = await service.getPersonsById(id);

    const responsePersons = {
      success: true,
      data: persons,
      message: "Persona cargada correctamente",
      count: 1,
    };

    res.status(200).json(responsePersons);
  } catch (error) {
    next(error);
  }
}

async function updatePerson(req, res, next) {
  try {
    const resValidatePartialPerson = validatePartialPerson(req.body);

    if (resValidatePartialPerson.error) {
      const errorObj = generateErrorMessage(resValidatePartialPerson);
      throw boom.badData(errorObj);
    }

    const { id } = req.params;

    const paramsUpdatePersons = {
      ...resValidatePartialPerson.data,
      DateUpdate: new Date(),
    };

    const updatedPerson = await service.updatePerson(id, paramsUpdatePersons);

    const responsePersons = {
      success: true,
      data: updatedPerson,
      message: "Persona actualizada correctamente",
      count: 1,
    };

    res.status(200).json(responsePersons);
  } catch (error) {
    next(error);
  }
}

async function deletePerson(req, res, next) {
  try {
    const resValidatePartialPerson = validatePartialPerson(req.body);

    if (resValidatePartialPerson.error) {
      const errorObj = generateErrorMessage(resValidatePartialPerson);
      throw boom.badData(errorObj);
    }

    const { id } = req.params;

    const paramsDeletePersons = {
      ...resValidatePartialPerson.data,
      Enabled: false,
      DateUpdate: new Date(),
    };

    await service.updatePerson(id, paramsDeletePersons);

    const responsePersons = {
      success: true,
      data: id,
      message: "Persona eliminada correctamente",
      count: 1,
    };

    res.status(200).json(responsePersons);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPerson,
  getAllPersonsEnabled,
  getPersonsById,
  updatePerson,
  deletePerson,
};
