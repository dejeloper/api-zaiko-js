const PersonsService = require("../services/v1/persons.service");

const service = new PersonsService();

async function createPerson(req, res, next) {
  try {
    const {
      Name,
      LastName,
      DocumentType,
      DocumentNumber,
      DateBirthday,
      State,
      UserCreated,
    } = req.body;

    const paramsNewPersons = {
      Name,
      LastName,
      DocumentType,
      DocumentNumber,
      DateBirthday,
      State,
      UserCreated,
    };

    const newPerson = await service.createPerson(paramsNewPersons);

    const responseNewPerson = {
      success: true,
      data: newPerson,
      message: "Ok",
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
      message: "Ok",
      count: persons.length,
    };

    res.status(200).json(responsePersons);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPerson,
  getAllPersonsEnabled,
};
