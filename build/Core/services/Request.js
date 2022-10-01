"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MethodEnum_1 = __importDefault(require("../Routes/MethodEnum"));
const url = require('url');
class Request {
    constructor(req) {
        this.req = req;
        this.url = req.url;
        this.method = req.method;
    }
    async setData(req) {
        var _a;
        let baseURI = url.parse(req.url, true);
        let path = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
        let params = path === null || path === void 0 ? void 0 : path.slice(1)[path.length - 2];
        let query = baseURI.query;
        let body;
        switch (this.method) {
            case MethodEnum_1.default.GET:
                this.url = url.parse(req.url).pathname;
                this.data = { params, query };
                break;
            case MethodEnum_1.default.POST:
                this.data = await Promise.resolve(this.parseBody(req));
                break;
            case MethodEnum_1.default.PUT:
                this.data = await Promise.resolve(this.parseBody(req));
                break;
            case MethodEnum_1.default.DELETE:
                this.data = await Promise.resolve(this.parseBody(req));
                break;
            default:
                break;
        }
    }
    parseBody(req) {
        let body = [];
        return new Promise((resolve, reject) => {
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                return resolve(parsedBody);
            });
        });
    }
    static async instance(req) {
        const request = new Request(req);
        await request.setData(req);
        return request;
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map