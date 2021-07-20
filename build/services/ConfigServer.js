"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var ConfigServer = /** @class */ (function () {
    function ConfigServer(port) {
        if (port)
            this.port = port;
        else
            this.port = 3000;
    }
    ConfigServer.prototype.init = function (routingList) {
        return http_1.createServer(routingList).listen(this.port);
    };
    return ConfigServer;
}());
exports.default = ConfigServer;
