const express = require("express");

const {
  createPerson,
  getAllPersonsEnabled,
} = require("../../../controllers/persons.controller");

const router = express.Router();

router.post("/", createPerson);
router.get("/", getAllPersonsEnabled);
router.get("/getAllPersonsEnabled/", getAllPersonsEnabled);

module.exports = router;
