import { useParams } from "react-router";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "../controllers/planets";

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

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", validacionDePlaneta, create);

app.put("/api/planets/:id", validacionDePlaneta, updateById);

app.delete("/api/planets/:id", validacionDePlaneta, deleteById);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
