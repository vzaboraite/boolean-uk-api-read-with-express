const express = require("express");

const { createOne, getAll, getOneById, getFiction } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/fiction", getFiction);

router.get("/:id", getOneById);

module.exports = router;
