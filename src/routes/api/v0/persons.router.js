const express = require("express");

const {
  createPerson,
  getAllPersonsEnabled,
  updatePerson,
  deletePerson,
  getPersonsById,
} = require("../../../controllers/v0/persons.controller");

const router = express.Router();

router.post("/", createPerson);
router.get("/", getAllPersonsEnabled);
router.get("/getAllPersonsEnabled/", getAllPersonsEnabled);
router.get("/:id", getPersonsById);
router.patch("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
