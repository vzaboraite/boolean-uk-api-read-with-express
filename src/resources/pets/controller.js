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

module.exports = {
  createOne,
};
