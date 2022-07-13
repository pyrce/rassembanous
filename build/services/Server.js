"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../Routes/Router"));
const http_1 = require("http");
const Request_1 = __importDefault(require("./Request"));
const Reponse_1 = __importDefault(require("./Reponse"));
const Url = __importStar(require("url"));
const express_1 = __importDefault(require("express"));
const checkJWT_1 = __importDefault(require("../Routes/middleware/checkJWT"));
const app = (0, express_1.default)();
/**
 * Singleton to initiate nodejs server
 */
class Server {
    constructor() {
        this.port = 0;
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3500;
    }
    /**Recupere la route et renvoie une vue ou une erreur
     *
     * @param req
     * @returns
     */
    checkRoute(req) {
        var _a;
        const method = req.method;
        let baseURI = Url.parse(req.url, true);
        let path = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
        let params = path === null || path === void 0 ? void 0 : path.slice(1)[path.length - 2];
        const someRoute = Router_1.default.getAll().find((element) => (element.url.match(baseURI.path) && element.method == req.method) ||
            (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method));
        console.log("direname : ");
        console.log(__dirname);
        if (someRoute) {
            if (someRoute.middleware != null) {
                let check = checkJWT_1.default.checkToken(someRoute.middleware);
                console.log("is check : " + check);
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
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }
    init() {
        //app.use(express.static(path.join( 'public')))
        // app.use(cors());
        // app.get("*", (req, res) => {
        //     res.sendFile(path.join(__dirname,"../", "client", "dist", "index.html"));
        // });
        //JWTToken.makeJWT({id:1,id_role:1,nom:"DOE",prenom:"John"});
        console.log("server init");
        let server = (0, http_1.createServer)((request, response) => __awaiter(this, void 0, void 0, function* () {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            response.setHeader('Access-Control-Allow-Methods', '*');
            let myRequest = yield Request_1.default.instance(request);
            let myResponse = new Reponse_1.default(response);
            myRequest.setData(request);
            let data = yield this.checkRoute(myRequest);
            myResponse.emit(data);
        }));
        server.listen(this.port, '0.0.0.0');
    }
    static start() {
        this.getInstance().init();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map