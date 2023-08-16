const express = require("express");

const {
  getAllPersonsEnabled,
} = require("../../../controllers/persons.controller");

const router = express.Router();

router.get("/", getAllPersonsEnabled);
router.get("/getAllPersonsEnabled/", getAllPersonsEnabled);

module.exports = router;
