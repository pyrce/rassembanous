"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var JWToken_1 = require("../../services/JWToken");
var checkJWT = /** @class */ (function () {
    function checkJWT() {
    }
    checkJWT.checkToken = function (options) {
        //Get the jwt token from the head
        var token = JWToken_1["default"].getToken();
        var jwtPayload;
        if (options.isAuth) {
            //Try to validate the token and get data
            if (token != undefined) {
                jwtPayload = jwt.verify(token, config_1["default"].jwtSecret);
                var user = JWToken_1["default"].getUser();
                if (options.id_role === user.role) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
    };
    return checkJWT;
}());
exports["default"] = checkJWT;
