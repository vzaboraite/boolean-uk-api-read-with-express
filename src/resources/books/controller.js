const db = require("../../utils/database");

const createOne = async (req, res) => {
  console.log("Books Router [CREATE]", { body: req.body });

  const bookToCreate = {
    ...req.body,
  };

  const createOneSQL = `
    INSERT INTO books
      (title, author, type, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const { title, author, type, topic, publicationDate } = bookToCreate;

  try {
    const result = await db.query(createOneSQL, [
      title,
      author,
      type,
      topic,
      publicationDate,
    ]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const getAllSql = `
    SELECT * 
    FROM books
  `;
  try {
    const result = await db.query(getAllSql);

    res.json({ data: result.rows });
  } catch (error) {
    console.error("[ERROR] getAll: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;

  const getOneByIdSql = `
  SELECT *
  FROM books
  WHERE id = $1
  `;

  try {
    const result = await db.query(getOneByIdSql, [id]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] getOneById: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getFiction = async (req, res) => {
  const getFictionSql = `
    SELECT * 
    FROM books
    WHERE type = 'Fiction'
  `;

  try {
    const result = await db.query(getFictionSql);

    res.json({ data: result.rows });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getNonFiction = async (req, res) => {
  const getNonFictionSql = `
    SELECT *
    FROM books
    WHERE type = 'Non-Fiction'
  `;

  try {
    const result = await db.query(getNonFictionSql);

    res.json({ data: result.rows });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOne,
  getAll,
  getOneById,
  getFiction,
  getNonFiction,
};
