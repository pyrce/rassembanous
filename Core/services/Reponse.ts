import { ServerResponse } from 'http';
import Render from '../Viewer/Render';

class Response {


    reponse: ServerResponse


    constructor(rep: ServerResponse) {
        this.reponse = rep

    }

    public emit(data: any) {


        if (typeof data === "string") {

            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.end(JSON.stringify(data));

        } else if (data instanceof Render) {
      
            let rend= data.render();

            this.reponse.writeHead(200, { 'Content-Type': 'text/html' });
            this.reponse.end(rend);

        } else {

            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }


    public static instance(req: ServerResponse){
        return new Response(req)
    }
}

export default Response;