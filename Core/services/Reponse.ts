import { ServerResponse } from 'http';


class Response {


    private static _instance: Response;

    constructor(private reponse: ServerResponse) {
        this.reponse = reponse;
    }

    public emit(data: any) {

        if (typeof data === "string") {

            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);

        } else if(data==Object){
            if(data.contentType){
                this.reponse.writeHead(202,{"Content-type":data.contentType});
                this.reponse.end(data.content)
            }
        }else{
            
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }

}

export default Response;