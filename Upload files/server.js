"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controlers_1 = require("./controllers/controlers");
var multer = require("multer");
var express = require("express");
var morgan = require("morgan");
var app = express();
var port = 3000;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.use(morgan("dev"));
app.use(express.json());
app.get("/api/planets", controlers_1.getAll);
app.get("/api/planets/:id", controlers_1.getOneById);
app.post("/api/planets", controlers_1.validacionDePlaneta, controlers_1.create);
app.put("/api/planets/:id", controlers_1.validacionDePlaneta, controlers_1.updateById);
app.delete("/api/planets/:id", controlers_1.validacionDePlaneta, controlers_1.deleteById);
app.post("/api/planets/:id/image", upload.single("image"), controlers_1.createImage);
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
