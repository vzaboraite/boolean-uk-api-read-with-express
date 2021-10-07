const express = require("express");

const { createOne, getAll } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

module.exports = router;
