import MethodEnum from "./MethodEnum";
import Route from "./Route";
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
        instance.add(MethodEnum.GET, url, middleware, callback);
    }
    static post(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum.POST, url, middleware, callback);
    }
    static put(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum.PUT, url, middleware, callback);
    }
    static delete(url, middleware, callback) {
        const instance = Router.getInstance();
        instance.add(MethodEnum.DELETE, url, middleware, callback);
    }
    add(method, url, middleware, callback) {
        let maRoute = new Route(method, url, middleware, callback);
        this.routes.push(maRoute);
    }
    static getAll() {
        return this.getInstance().routes;
    }
}
export default Router;
