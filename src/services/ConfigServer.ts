import Router from '../routers/Router';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as ejs     from "ejs";
import * as fs      from "fs";
import * as path    from "path";
/**
 * Singleton to initiate nodejs server
 */
class ConfigServer {
    port: number = 3000;
    private static instance: ConfigServer;

    private static getInstance(): ConfigServer {
        if(!this.instance) {
            this.instance = new ConfigServer();
        }
        return this.instance;
    }

    public  checkRoute(req:IncomingMessage,res:ServerResponse){
        const method        = req.method;
        const url           = req.url;
        const someRoute=Router.getAll().find(element=>{ return element.url==url && element.method==method })

        if(someRoute){
            if( someRoute.callback){
               let data=someRoute.callback
               const rootFolder   = path.resolve('./');
               const templatePath = path.join(rootFolder, 'src', 'views', `${data.view}.ejs`);
               const values = data.data ;
               const template = fs.readFileSync(templatePath, 'utf8');
               return res.end(ejs.render(template, values));
            }
           
        }else{
            const rootFolder   = path.resolve('./');
            const templatePath = path.join(rootFolder, 'src', 'views', '404.ejs');
            const template = fs.readFileSync(templatePath, 'utf8');
            return res.end(ejs.render(template));
        }
    }


    constructor(port?: number){
        if(port) this.port = port;
        else     this.port = 3000;
    }



    private  init() {
        let server = createServer((request: IncomingMessage, response: ServerResponse) => {
            this.checkRoute(request, response);
        })
        server.listen(this.port);
    }
    public static start(){
        this.getInstance().init();
    }

}

export default ConfigServer;