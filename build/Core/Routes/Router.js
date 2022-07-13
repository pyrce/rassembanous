"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MethodEnum_1 = __importDefault(require("./MethodEnum"));
const Route_1 = __importDefault(require("./Route"));
class Router {
    constructor() {
        //...
        // this.maRoute=new Route();
        // private maRoute : Route;
        this.routes = [];
    }
    static getInstance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    static get(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum_1.default.GET, url, middleware, callback);
    }
    static post(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum_1.default.POST, url, middleware, callback);
    }
    static put(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum_1.default.PUT, url, middleware, callback);
    }
    static delete(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum_1.default.DELETE, url, middleware, callback);
    }
    add(method, url, middleware, callback) {
        let maRoute = new Route_1.default(method, url, middleware, callback);
        this.routes.push(maRoute);
    }
    static getAll() {
        return this.getInstance().routes;
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map