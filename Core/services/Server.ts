import Router from '../Routes/Router';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import CustomAdapter from "./Request"
import Render from '../Viewer/Render';
import Request from './Request';
import Response from './Reponse';
import * as Url  from 'url';
import { copyFileSync } from 'fs';

/**
 * Singleton to initiate nodejs server
 */
class Server {
    port: number = 3001;
    private static instance: Server;
    adapter!: CustomAdapter;
    SERVER: any

    constructor(port?: number) {
        if (port) this.port = port;
        else this.port = 3000;
    }
    /**Recupere la route et renvoie une vue ou une erreur
     * 
     * @param req 
     * @returns 
     */
    public  checkRoute(req: any) {
        const method = req.method;
        let baseURI = Url.parse(req.url, true);
        let path = baseURI.pathname?.split('/');
        let params = path?.slice(1)[path.length - 2];
 
        
        const someRoute = Router.getAll().find((element:any) =>
            (element.url.match(baseURI.path) && element.method == req.method) ||
            (element.url.match(element.params, params) && element.url.replace(element.params, params) == baseURI.path && element.method == req.method)
                        );

        if (someRoute) {

            return someRoute.callback(req);
        } else {
            const erreur = Render.make("404", {});
            return erreur;
        }
    }


    private static getInstance(): Server {
        if (!this.instance) {
            this.instance = new Server();
        }
        return this.instance;
    }

    private init() {

        let server = createServer( async (request: IncomingMessage, response: ServerResponse) => {
            let myRequest = await Request.instance(request)
            let myResponse = Response.instance(response);
            myRequest.setData(request);
            let data= await this.checkRoute(myRequest);
            myResponse.emit(data);
        })
        server.listen(this.port);
    }
    public static start() {

        this.getInstance().init();
    }

}

export default Server;