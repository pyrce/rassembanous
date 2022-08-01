import Router from '../Routes/Router';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import CustomAdapter from "./Request"
import Request from './Request';
import Response from './Reponse';
import * as Url from 'url';
import { copyFileSync } from 'fs';
import * as jwt from "jsonwebtoken";
import JWTToken from './JWToken';
import express from 'express';
import * as path from "path";
import cors from 'cors';
import csurf from "csurf";
import checkJWT from "../Routes/middleware/checkJWT";
const app = express();
/**
 * Singleton to initiate nodejs server
 */
class Server {
    port: number = 0;
    private static instance: Server;
    adapter!: CustomAdapter;
    SERVER: any

    constructor() {

        this.port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3500
    }      


 
    /**Recupere la route et renvoie une vue ou une erreur
     * 
     * @param req 
     * @returns 
     */
    public checkRoute(req: any) {
        const method = req.method;
        let baseURI = Url.parse(req.url, true);
        let URIpath:any = baseURI.pathname?.split('/');
        let params = URIpath?.slice(1)[URIpath.length - 2];

        const someRoute = Router.getAll().find((element: any) =>
            (element.url.match(baseURI.path) && element.method == req.method) ||
            (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method)
        );

        if (someRoute) {

            if (someRoute.middleware != null) {
                let check = checkJWT.checkToken(someRoute.middleware)
                console.log("is check : " + check)
                if (check) {
                    return someRoute.callback(req);
                } else {

                    return JSON.stringify({ status: "403", msg: "KO - token not found" })
                }
            } else {
                return someRoute.callback(req);
            }
        } else {

            return JSON.stringify({ status: "404", msg: "KO - not found" })
        }
    }


    private static getInstance(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }

    private init() {

        // app.use(cors());

        //JWTToken.makeJWT({id:1,id_role:1,nom:"DOE",prenom:"John"});
  

        let server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            response.setHeader('Access-Control-Allow-Methods', '*');

            let myRequest = await Request.instance(request)
            let myResponse = new Response(response);
            myRequest.setData(request);
            let data = await this.checkRoute(myRequest);

            myResponse.emit(data);
        });     

console.log(this.port)
        server.listen(this.port);
    }
    public static start() {

        this.getInstance().init();
    }

}

export default Server;