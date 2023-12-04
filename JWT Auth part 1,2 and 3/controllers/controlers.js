"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.validacionDePlaneta = exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
var db_1 = require("../db");
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
exports.validacionDePlaneta = validacionDePlaneta;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.db.many("SELECT * FROM planets")];
            case 1:
                planets = _a.sent();
                console.log(planets);
                res.status(200).send(planets);
                return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getOneById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db_1.db.one("SELECT * FROM planets WHERE id=$1", Number(id))];
            case 1:
                planet = _a.sent();
                res.status(200).json(planet);
                return [2 /*return*/];
        }
    });
}); };
exports.getOneById = getOneById;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                return [4 /*yield*/, db_1.db.none("INSERT INTO planets (name) VALUES ($1)", name)];
            case 1:
                _a.sent();
                res.status(201).json({ msg: "Success, created new planet" });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var updateById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                name = req.body.name;
                return [4 /*yield*/, db_1.db.none("UPDATE planets SET name=$2 WHERE is=$1", [Number(id), name])];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Planet changed" });
                return [2 /*return*/];
        }
    });
}); };
exports.updateById = updateById;
var deleteById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db_1.db.none("DELETE FROM planets WHERE id=$1", Number(id))];
            case 1:
                _a.sent();
                res.status(200).json({ msg: "Planet deleted" });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteById = deleteById;
var createImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fileName;
    var _a;
    return __generator(this, function (_b) {
        id = req.params.id;
        fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (fileName) {
            res.status(201).json({ msg: "Image uploaded" });
            db_1.db.none("UPDATE planets SET image=$2 WHERE id=$1;", [id, fileName]);
        }
        else {
            res.status(400).json({ msg: "Upload failed" });
        }
        return [2 /*return*/];
    });
}); };
exports.createImage = createImage;
