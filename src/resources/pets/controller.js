const { ReadyForQueryMessage } = require("pg-protocol/dist/messages");
const db = require("../../utils/database");
const { splitAndJoin } = require("../../utils/StringUtils");

const createOne = async (req, res) => {
  console.log("Pets Router [CREATE]", { body: req.body });

  const petToCreate = {
    ...req.body,
  };

  const createOneSQL = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { name, age, type, microchip } = petToCreate;

  try {
    const result = await db.query(createOneSQL, [name, age, type, microchip]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const { microchip } = req.query;
  let getAllSQL = `
  SELECT *
  FROM pets
  `;

  if (microchip) {
    getAllSQL = `
  ${getAllSQL}
  WHERE microchip = false
  `;
  }

  try {
    const result = await db.query(getAllSQL);

    res.json(result.rows);
  } catch (error) {
    console.error("[ERROR] getAll: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getOneById = async (req, res) => {
  const getOneByIdSQL = `
  SELECT *
  FROM pets
  WHERE id = $1
  `;

  try {
    const result = await db.query(getOneByIdSQL, [req.params.id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("[ERROR] getOneById: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getTypes = async (req, res) => {
  const getTypesSQL = `
  SELECT DISTINCT type
  FROM pets
  `;

  try {
    const result = await db.query(getTypesSQL);

    res.json({ data: result.rows });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getPetsOfType = async (req, res) => {
  const { breed } = req.query;
  const splittedAndJoinedBreed = splitAndJoin(breed);

  const { type } = req.params;

  const getPetsOfTypeSQL = `
  SELECT * 
  FROM pets 
  WHERE type= $1
  `;

  const getPetsOfTypeAndBreedSQL = `
  SELECT * 
  FROM pets
  WHERE breed ILIKE $1
  `;

  /* 
  TODO: Figure out how to fix case-sensitivity in database `breed` column's values like:
    - Grand Anglo-Français Blanc et Orange
    - Xiasi Dog
    - ara
    - LaPerm
    - Champagne D’Argent 

  Q: Should there be used regexp?

  S: 1. Used ILIKE in SQL template to ingnore case-sensitivity
     2. Used splitAndJoin() from utils to work with query values(works just with simple value examples, 
      doesn't work with cases where breed name includes `-`)
 */

  try {
    let result = null;
    if (breed) {
      result = await db.query(getPetsOfTypeAndBreedSQL, [
        splittedAndJoinedBreed,
      ]);
    } else {
      result = await db.query(getPetsOfTypeSQL, [type]);
    }

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
  getTypes,
  getPetsOfType,
};
