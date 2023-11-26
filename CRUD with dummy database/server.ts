import { useParams } from "react-router";

const express = require("express");
const morgan = require("morgan");
const config = require("../Set up a simple Express App/__MACOSX/config");
require("express-async-errors");

const app = express();
const port = config.PORT;

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

app.use(morgan("dev"));
app.use(express.json());

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

app.get("/api/planets", (req, res) => {
  console.log(planets); // Imprime los datos de planets en la consola
  res.status(200).send(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

app.post("/api/planets", validacionDePlaneta, (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Success, created new planet" });
});

app.put("/api/planets/:id", validacionDePlaneta, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ msg: "Planet changed" });
});

app.delete("/api/planets/:id",validacionDePlaneta, (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: "Planet deleted" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
