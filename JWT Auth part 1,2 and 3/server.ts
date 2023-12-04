import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  validacionDePlaneta,
  createImage,
} from "./controllers/controlers";
import * as multer from "multer";
import { logIn, signUp ,logOut} from "./controllers/users";
import authorize from "./authorize";
import "./passport"

const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3006;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", validacionDePlaneta, create);

app.put("/api/planets/:id", validacionDePlaneta, updateById);

app.delete("/api/planets/:id", validacionDePlaneta, deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.post("/api/users/login", logIn);

app.post("/api/users/signup", signUp);

app.get("/api/users/logout",authorize, logOut);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
