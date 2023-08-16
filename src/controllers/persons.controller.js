const PersonsService = require("../services/v1/persons.service");

const service = new PersonsService();

async function getAllPersonsEnabled(req, res, next) {
  console.log("Desde controlador");
  try {
    const persons = await service.getAllPersonsEnabled();
    res.json(persons);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPersonsEnabled,
};
