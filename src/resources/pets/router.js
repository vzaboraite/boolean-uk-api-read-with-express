const express = require("express");

const { createOne } = require("./controller");

const router = express.Router();

router.post("/", createOne);

module.exports = router;
