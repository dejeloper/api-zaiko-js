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
    const { id } = req.params;
    const {
      Name,
      LastName,
      DocumentType,
      DocumentNumber,
      DateBirthday,
      State,
      UserUpdate,
    } = req.body;

    const paramsUpdatePersons = {
      ...(Name && { Name }),
      ...(LastName && { LastName }),
      ...(DocumentType && { DocumentType }),
      ...(DocumentNumber && { DocumentNumber }),
      ...(DateBirthday && { DateBirthday }),
      ...(State && { State }),
      ...(UserUpdate && { UserUpdate }),
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
    const { id } = req.params;
    const { UserUpdate } = req.body;

    const paramsDeletePersons = {
      ...(UserUpdate && { UserUpdate }),
      Enabled: false,
      DateUpdate: new Date(),
    };

    const deletePersons = await service.updatePerson(id, paramsDeletePersons);

    const responsePersons = {
      success: true,
      data: deletePersons,
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
