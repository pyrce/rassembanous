"use strict";
exports.__esModule = true;
var Route = /** @class */ (function () {
    function Route(method, url, middleware, callback) {
        this.method = method;
        this.url = url;
        this.middleware = middleware;
        this.callback = callback;
        this.params = ":" + url.split(':')[1];
    }
    return Route;
}());
exports["default"] = Route;
