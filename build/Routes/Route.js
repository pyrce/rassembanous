class Route {
    constructor(method, url, middleware, callback) {
        this.method = method;
        this.url = url;
        this.middleware = middleware;
        this.callback = callback;
        this.params = ":" + url.split(':')[1];
    }
}
export default Route;
