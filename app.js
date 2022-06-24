"use strict";
exports.__esModule = true;
var Server_1 = require("./Core/services/Server");
var Routes_1 = require("./Core/Routes/Routes");
Routes_1["default"].make();
Server_1["default"].start();
