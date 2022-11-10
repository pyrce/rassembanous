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
const fs = require("fs");
require("dotenv").config();
const checkJWT_1 = __importDefault(require("../Routes/middleware/checkJWT"));
const app = (0, express_1.default)();
/**
 * Singleton to initiate nodejs server
 */
class Server {
    constructor() {
        this.port = 0;
        console.log("heroku port : " + process.env.PORT);
        this.port = process.env.PORT || 3500;
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
        let URIpath = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
        let params = URIpath === null || URIpath === void 0 ? void 0 : URIpath.slice(1)[URIpath.length - 2];
        console.time("checkroute");
        const someRoute = Router_1.default.getAll().find((element) => (element.url.match(baseURI.path) && element.method == req.method) ||
            (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method));
        if (someRoute) {
            console.log(someRoute);
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
                console.timeEnd("checkroute");
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
        console.log("server init !");
        // app.use(cors());
        //JWTToken.makeJWT({id:1,id_role:1,nom:"DOE",prenom:"John"});
        // const used = process.memoryUsage().heapUsed / 1024 / 1024; console.log(`The script uses approximately ${used} MB`);
        let server = (0, http_1.createServer)(async (request, response) => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            response.setHeader('Access-Control-Allow-Methods', '*');
            let myRequest = await Request_1.default.instance(request);
            let myResponse = new Reponse_1.default(response);
            myRequest.setData(request);
            let data = await this.checkRoute(myRequest);
            myResponse.emit(data);
        });
        console.log("server end init !");
        server.listen(this.port);
    }
    static start() {
        console.log("info usage mémoire : ");
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${used} MB`);
        // const myVar = process.env.VUE_APP_BASE_URL;
        // let rawJson = fs.readFileSync("./client/package.json");
        // let parsed = JSON.parse(rawJson);
        // parsed.proxy = myVar; // or whatever string defines your script
        // let backToJson = JSON.stringify(parsed);
        // fs.writeFileSync("./client/package.json", backToJson);
        if (process.env.NODE_ENV === 'production') {
            // Static folder
            app.use(express_1.default.static(__dirname + '/public/'));
            console.log("heroku spa");
            // Handle SPA
            app.get(/.*/, (req, res) => res.sendFile(__dirname + '/client/dist/index.html'));
        }
        this.getInstance().init();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map