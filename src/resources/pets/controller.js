const { capitalize } = require("../../utils/StringUtils");
const db = require("../../utils/database");

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
  const { type } = req.params;
  const { breed, microchip } = req.query;

  const sqlParams = [type];

  let getPetsOfTypeSQL = `
  SELECT * 
  FROM pets 
  WHERE type = $1
  `;

  if (breed) {
    const transformedBreed = capitalize(breed);
    getPetsOfTypeSQL += `
    AND
    breed = $2
    `;

    sqlParams.push(transformedBreed);
  }

  if (microchip) {
    getPetsOfTypeSQL += `
    AND breed = $2
    AND microchip = $3
    `;

    sqlParams.push(microchip);
  }

  try {
    const result = await db.query(getPetsOfTypeSQL, sqlParams);

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
