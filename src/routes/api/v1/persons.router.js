const express = require("express");
const PersonsService = require("../../../services/v1/persons.service");

const router = express.Router();
const service = new PersonsService();

router.get("/getAllPersonsEnabled/", async (req, res, next) => {
  try {
    const persons = await service.getAllPersonsEnabled();
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
