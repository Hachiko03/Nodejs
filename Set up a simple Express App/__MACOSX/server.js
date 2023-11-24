const express = require("express");
const morgan = require("morgan");
const config = require("./config");
require("express-async-errors");

const app = express();
const port = config.PORT;

app.use(morgan("dev"));
app.use(express.json());

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

/* app.get("/", (req, res) => {
  console.log(planets); // Imprime los datos de planets en la consola
  res.send(planets);
}); */

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});