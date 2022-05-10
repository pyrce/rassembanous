import { ServerResponse } from 'http';
import Render from '../Views/Render';

class Response {


    private static _instance: Response;

    constructor(private reponse:ServerResponse) {
        this.reponse = reponse;
    }

    public emit(data: any) {

        if (typeof data === "string") {

            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);

        } else if (data instanceof Render) {
  
            let rend= data.render();

            this.reponse.writeHead(200, { 'Content-Type': 'text/html' });
            this.reponse.end(rend);

        } else {
console.log("data");
console.log(data);
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }

}

export default Response;