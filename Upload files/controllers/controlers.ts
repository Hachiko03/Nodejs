import * as pgPromise from "pg-promise";

const Joi = require("joi");

const planetSchem = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

function validacionDePlaneta(req, res, next) {
  const { error } = planetSchem.validate(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    next();
  }
}

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/Develhope");

/* console.log(db) */

const setupDB = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  );
  `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
};

setupDB();

const getAll = async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets`);
  console.log(planets);
  res.status(200).send(planets);
};
const getOneById = async (req, res) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1`, Number(id));
  res.status(200).json(planet);
};
const create = async (req, res) => {
  const { name } = req.body;
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  res.status(201).json({ msg: "Success, created new planet" });
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE is=$1`, [Number(id), name]);
  res.status(200).json({ msg: "Planet changed" });
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({ msg: "Planet deleted" });
};

const createImage = async (req, res) => {
  const { id } = req.params;
  const fileName = req.file?.path;
  if (fileName) {
    res.status(201).json({ msg: "Image uploaded" });
    db.none(`UPDATE planets SET image=$2 WHERE id=$1;`, [id, fileName]);
  } else {
    res.status(400).json({ msg: "Upload failed" });
  }
};

export {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  validacionDePlaneta,
  createImage,
};
