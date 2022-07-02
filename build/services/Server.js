var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Router from '../Routes/Router';
import { createServer } from 'http';
import Request from './Request';
import Response from './Reponse';
import * as Url from 'url';
import express from 'express';
import * as path from "path";
import checkJWT from "../Routes/middleware/checkJWT";
const app = express();
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
        const someRoute = Router.getAll().find((element) => (element.url.match(baseURI.path) && element.method == req.method) ||
            (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method));
        if (someRoute) {
            if (someRoute.middleware != null) {
                let check = checkJWT.checkToken(someRoute.middleware);
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
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "client", "build", "index.html"));
        });
        //JWTToken.makeJWT({id:1,id_role:1,nom:"DOE",prenom:"John"});
        let server = createServer((request, response) => __awaiter(this, void 0, void 0, function* () {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            response.setHeader('Access-Control-Allow-Methods', '*');
            let myRequest = yield Request.instance(request);
            let myResponse = new Response(response);
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
export default Server;
