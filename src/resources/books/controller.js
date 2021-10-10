const { capitalize } = require("../../utils/StringUtils");
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
  const getAllSQL = `
    SELECT * 
    FROM books
  `;
  try {
    const result = await db.query(getAllSQL);

    res.json({ data: result.rows });
  } catch (error) {
    console.error("[ERROR] getAll: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;

  const getOneByIdSQL = `
  SELECT *
  FROM books
  WHERE id = $1
  `;

  try {
    const result = await db.query(getOneByIdSQL, [id]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] getOneById: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getFictionBooks = async (req, res) => {
  const { topic } = req.query;

  let getFictionBooksSQL = `
    SELECT * 
    FROM books
    WHERE type = 'Fiction'
  `;

  if (topic) {
    getFictionBooksSQL = `
    ${getFictionBooksSQL} 
    AND topic = '${topic}'
    `;
  }

  try {
    const result = await db.query(getFictionBooksSQL);

    res.json({ data: result.rows });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getNonFictionBooks = async (req, res) => {
  const { topic } = req.query;

  let getNonFictionBooksSQL = `
    SELECT *
    FROM books
    WHERE type = 'Non-Fiction'
  `;

  if (topic) {
    getNonFictionBooksSQL = `
    ${getNonFictionBooksSQL} 
    AND topic = '${topic}'
    `;
  }

  try {
    const result = await db.query(getNonFictionBooksSQL);

    res.json({ data: result.rows });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const getAuthorBooks = async (req, res) => {
  const { name } = req.params;
  const nameCapitalized = capitalize(name);

  const { order } = req.query;

  let getAuthorSQL = `
  SELECT *
  FROM books
  WHERE author = $1
  `;

  if (order === "recent") {
    getAuthorSQL = `
    ${getAuthorSQL}
    ORDER BY publicationDate DESC
    `;
  }

  try {
    const result = await db.query(getAuthorSQL, [nameCapitalized]);

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
  getFictionBooks,
  getNonFictionBooks,
  getAuthorBooks,
};
