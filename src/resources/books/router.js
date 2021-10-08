const express = require("express");

const {
  createOne,
  getAll,
  getOneById,
  getFiction,
  getNonFiction,
} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/fiction", getFiction);

router.get("/non-fiction", getNonFiction);

router.get("/:id", getOneById);

module.exports = router;
