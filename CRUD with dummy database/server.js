"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var config = require("../Set up a simple Express App/__MACOSX/config");
require("express-async-errors");
var app = express();
var port = config.PORT;
var Joi = require("joi");
var planetSchem = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
});
function validacionDePlaneta(req, res, next) {
    var error = planetSchem.validate(req.body).error;
    if (error) {
        res.status(400).send(error);
    }
    else {
        next();
    }
}
app.use(morgan("dev"));
app.use(express.json());
var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
app.get("/api/planets", function (req, res) {
    console.log(planets); // Imprime los datos de planets en la consola
    res.status(200).send(planets);
});
app.get("/api/planets/:id", function (req, res) {
    var id = req.params.id;
    var planet = planets.find(function (p) { return p.id === Number(id); });
    res.status(200).json(planet);
});
app.post("/api/planets", validacionDePlaneta, function (req, res) {
    var _a = req.body, id = _a.id, name = _a.name;
    var newPlanet = { id: id, name: name };
    planets = __spreadArray(__spreadArray([], planets, true), [newPlanet], false);
    res.status(201).json({ msg: "Success, created new planet" });
});
app.put("/api/planets/:id", validacionDePlaneta, function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    planets = planets.map(function (p) { return (p.id === Number(id) ? __assign(__assign({}, p), { name: name }) : p); });
    res.status(200).json({ msg: "Planet changed" });
});
app.delete("/api/planets/:id", validacionDePlaneta, function (req, res) {
    var id = req.params.id;
    planets = planets.filter(function (p) { return p.id !== Number(id); });
    res.status(200).json({ msg: "Planet deleted" });
});
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
