"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(method, url, middleware, callback) {
        this.method = method;
        this.url = url;
        this.middleware = middleware;
        this.callback = callback;
        this.params = ":" + url.split(':')[1];
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map