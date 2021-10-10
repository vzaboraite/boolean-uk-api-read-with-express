const express = require("express");

const {
  createOne,
  getAll,
  getOneById,
  getTypes,
  getPetsOfType,
} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/types", getTypes);

router.get("/:type", getPetsOfType);

router.get("/:id", getOneById);

module.exports = router;
