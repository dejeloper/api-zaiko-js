const express = require("express");

const { login } = require("../../../controllers/v1/login.controllers");

const router = express.Router();

router.post("/", login);

module.exports = router;
