import { ServerResponse } from 'http';
import Render from '../views/Render';
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import Database from '../database/Database';

class CustomReponse {


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

}

export default CustomReponse;