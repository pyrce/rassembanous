import Request from "../../services/Request";
import Response from "../../services/Reponse";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import Router from "../Router";
import { ServerResponse } from 'http';
import multer from "multer";
import * as path from "path";
class Multer {

  public static uploadFile(request: Request){
     
    const cwd=process.cwd();

//    const upload= multer({
//         "dest":path.join(cwd,"client","public")
//     })

//     upload.single("affiche");
}

}
export default Multer;
