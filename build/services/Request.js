var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MethodEnum from '../Routes/MethodEnum';
const url = require('url');
class Request {
    constructor(req) {
        this.req = req;
        this.url = req.url;
        this.method = req.method;
    }
    setData(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let baseURI = url.parse(req.url, true);
            let path = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
            let params = path === null || path === void 0 ? void 0 : path.slice(1)[path.length - 2];
            let query = baseURI.query;
            let body;
            switch (this.method) {
                case MethodEnum.GET:
                    this.url = url.parse(req.url).pathname;
                    this.data = { params, query };
                    break;
                case MethodEnum.POST:
                    this.data = yield Promise.resolve(this.parseBody(req));
                    break;
                case MethodEnum.PUT:
                    this.data = yield Promise.resolve(this.parseBody(req));
                    break;
                case MethodEnum.DELETE:
                    this.data = yield Promise.resolve(this.parseBody(req));
                    break;
                default:
                    break;
            }
        });
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
    static instance(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(req);
            yield request.setData(req);
            return request;
        });
    }
}
export default Request;
