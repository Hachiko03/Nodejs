import { request, response } from "express";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const getAll = (req, res) => {
  console.log(planets); // Imprime los datos de planets en la consola
  res.status(200).send(planets);
};
const getOneById = (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
};
const create = (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Success, created new planet" });
};
const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ msg: "Planet changed" });
};
const deleteById = (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: "Planet deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
