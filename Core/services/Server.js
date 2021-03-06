"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Router_1 = require("../Routes/Router");
var http_1 = require("http");
var Request_1 = require("./Request");
var Reponse_1 = require("./Reponse");
var Url = require("url");
var checkJWT_1 = require("../Routes/middleware/checkJWT");
//const app = express();
/**
 * Singleton to initiate nodejs server
 */
var Server = /** @class */ (function () {
    function Server() {
        this.port = 0;
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3500;
    }
    /**Recupere la route et renvoie une vue ou une erreur
     *
     * @param req
     * @returns
     */
    Server.prototype.checkRoute = function (req) {
        var _a;
        var method = req.method;
        var baseURI = Url.parse(req.url, true);
        var path = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
        var params = path === null || path === void 0 ? void 0 : path.slice(1)[path.length - 2];
        var someRoute = Router_1["default"].getAll().find(function (element) {
            return (element.url.match(baseURI.path) && element.method == req.method) ||
                (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method);
        });
        if (someRoute) {
            if (someRoute.middleware != null) {
                var check = checkJWT_1["default"].checkToken(someRoute.middleware);
                console.log("check : " + check);
                if (check) {
                    return someRoute.callback(req);
                }
                else {
                    return JSON.stringify({ status: "403", msg: "KO - token not found" });
                }
            }
            else {
                return someRoute.callback(req);
            }
        }
        else {
            return JSON.stringify({ status: "404", msg: "KO - not found" });
        }
    };
    Server.getInstance = function () {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    };
    Server.prototype.init = function () {
        //app.use(express.static(path.join( 'public')))
        // app.use(cors());
        var _this = this;
        //JWTToken.makeJWT({id:1,id_role:1,nom:"DOE",prenom:"John"});
        var server = (0, http_1.createServer)(function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var myRequest, myResponse, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
                        response.setHeader('Access-Control-Allow-Methods', '*');
                        return [4 /*yield*/, Request_1["default"].instance(request)];
                    case 1:
                        myRequest = _a.sent();
                        myResponse = new Reponse_1["default"](response);
                        myRequest.setData(request);
                        return [4 /*yield*/, this.checkRoute(myRequest)];
                    case 2:
                        data = _a.sent();
                        myResponse.emit(data);
                        return [2 /*return*/];
                }
            });
        }); });
        server.listen(this.port, '0.0.0.0');
    };
    Server.start = function () {
        this.getInstance().init();
    };
    return Server;
}());
exports["default"] = Server;
