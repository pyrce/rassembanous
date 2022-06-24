"use strict";
exports.__esModule = true;
var MethodEnum_1 = require("./MethodEnum");
var Route_1 = require("./Route");
var Router = /** @class */ (function () {
    function Router() {
        //...
        // this.maRoute=new Route();
        // private maRoute : Route;
        this.routes = [];
    }
    Router.getInstance = function () {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    };
    Router.get = function (url, middleware, callback) {
        var instance = Router.getInstance();
        instance.add(MethodEnum_1["default"].GET, url, middleware, callback);
    };
    Router.post = function (url, middleware, callback) {
        var instance = Router.getInstance();
        instance.add(MethodEnum_1["default"].POST, url, middleware, callback);
    };
    Router.put = function (url, middleware, callback) {
        var instance = Router.getInstance();
        instance.add(MethodEnum_1["default"].PUT, url, middleware, callback);
    };
    Router["delete"] = function (url, middleware, callback) {
        var instance = Router.getInstance();
        instance.add(MethodEnum_1["default"].DELETE, url, middleware, callback);
    };
    Router.prototype.add = function (method, url, middleware, callback) {
        var maRoute = new Route_1["default"](method, url, middleware, callback);
        this.routes.push(maRoute);
    };
    Router.getAll = function () {
        return this.getInstance().routes;
    };
    return Router;
}());
exports["default"] = Router;
