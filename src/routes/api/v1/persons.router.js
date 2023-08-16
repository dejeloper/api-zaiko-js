const express = require("express");

const {
  createPerson,
  getAllPersonsEnabled,
  updatePerson,
  deletePerson,
  getPersonsById,
} = require("../../../controllers/persons.controller");

const router = express.Router();

router.post("/", createPerson);
router.get("/", getAllPersonsEnabled);
router.get("/getAllPersonsEnabled/", getAllPersonsEnabled);
router.get("/:id", getPersonsById);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
