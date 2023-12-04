"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var authorize = function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function (err, user) {
        if (!user || err) {
            res.status(401).json({ msg: "Unathorized" });
        }
        else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
exports.default = authorize;
