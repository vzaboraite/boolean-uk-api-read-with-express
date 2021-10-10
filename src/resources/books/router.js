const express = require("express");

const {
  createOne,
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
  getAuthorBooks,
} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/author/:name", getAuthorBooks);

router.get("/:id", getOneById);

module.exports = router;
