import { ServerResponse } from 'http';
import  * as fs  from 'fs';

class Response {


    private static _instance: Response;

    constructor(private reponse: ServerResponse) {
        this.reponse = reponse;
    }

    public emit(data: any) {
console.log("typeof data :"+typeof data);
        if (typeof data === "string") {

            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);

        } else if(data.contentType){
           // console.log(data);
            const filePath = "./client/dist/index.html";
            if(data.contentType){
                this.reponse.setHeader('Access-Control-Allow-Origin', '*');
                this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
                this.reponse.setHeader('Access-Control-Allow-Methods', '*');
                // this.reponse.writeHead(200, {
                //     "Content-Type": "application/octet-stream",
                //     "Content-Disposition": "attachment; filename=" + filePath
                // });
                fs.createReadStream(filePath).pipe(this.reponse);
               // this.reponse.writeHead(200,{"Content-type":data.contentType});
                this.reponse.end(data.content)
            }
        }else{
            
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }

}

export default Response;