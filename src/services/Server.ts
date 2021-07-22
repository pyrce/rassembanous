import Router from '../routers/Router';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import CustomAdapter from "./Request"
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import Render from '../views/Render';
import Request from './Request';
import Response from './Reponse';
/**
 * Singleton to initiate nodejs server
 */
class ConfigServer {
    port: number = 3000;
    private static instance: ConfigServer;
    adapter!: CustomAdapter;
    SERVER: any

    constructor(port?: number) {
        if (port) this.port = port;
        else this.port = 3000;
    }

    public  checkRoute(req: any) {
        const method = req.method;
        const url = req.url;
        const someRoute = Router.getAll().find(element => { return element.url == url && element.method == method })

        if (someRoute) {
            return someRoute.callback;
        } else {
            const erreur = Render.make("404", {});
            return erreur;
        }
    }


    private static getInstance(): ConfigServer {
        if (!this.instance) {
            this.instance = new ConfigServer();
            // this.adapter=new CustomAdapter();
        }
        return this.instance;
    }

    private init() {

        let server = createServer( async (request: IncomingMessage, response: ServerResponse) => {
            let myRequest = new Request(request);
            let myResponse = new Response(response);
            const data = await this.checkRoute(myRequest);
            myResponse.emit(data);
        })
        server.listen(this.port);
    }
    public static start() {

        this.getInstance().init();
    }

}

export default ConfigServer;