import Render from "../../Core/Views/Render";
import eventUser from "../Models/EventUser";
import partenaireUser from "../Models/PartenaireUserModel";
import eventsClass from "../Models/Events";
import * as jwt from "jsonwebtoken";
import Request from "../../Core/services/Request";
import * as path from "path";
import partenaireModel from "../Models/PartenaireModel";
import Response from "../services/Reponse";
import * as qrcode from "qrcode";
import JWTToken from "../services/JWToken";
import * as fs from "fs";
import mediaModel from "../Models/MediaModel";
import { saveAs } from 'file-saver';

class UserController {

    public static inscrire(request: Request){
        const { data } = request;

        const id = data.params;

        let dateJour=new Date();
        let nom=dateJour.getDate()+dateJour.getMonth()+dateJour.getFullYear()+"_"+dateJour.getHours()+dateJour.getMinutes()+dateJour.getSeconds();
        
        let userToken=JWTToken.getToken();

     var base64Payload = userToken.split('.')[1];
     var payload = Buffer.from(base64Payload, 'base64');
     let infoUser=JSON.parse(payload.toString());

             eventUser.insert({"id_event":data,"id_user":infoUser.id});
       qrcode.toFile(
            './public/image/'+nom+'.png',
            [{ data:infoUser.nom+" "+infoUser.prenom, mode: 'byte' }],
            {
                scale:4,
                width:800
              },  
function(){

    mediaModel.insert({"id_event":data,"id_user":infoUser.id,"id_type":2,nom:nom+".png"});
console.log("cb");
}
          )


    }

    public static follow(request: Request){

        let {data}=request;

        partenaireUser.insert({"id_partenaire":data,"id_user":5});
    }

public static getUser(){

    let userToken=JWTToken.getToken();

    var base64Payload = userToken.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    let infoUser=payload.toString();

    return infoUser;
}

public static async getUserProfil(request: Request){
    let {data}=request;

    let id=data.params;
    let rootDir = path.resolve('./');
    let user=await partenaireModel.find({id:id});
    user = JSON.parse(JSON.stringify(user));
    return Render.make('profil', { user:user[0],rootDir:rootDir })

}

public static async updateProfil(request: Request){
    let {data}=request;
console.log(data)
    let userToken=JWTToken.getToken();

    var base64Payload = userToken.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    let infoUser=JSON.parse(payload.toString());

    partenaireModel.update({id:infoUser.id},data);

}

    public static async getQRCODE(request: Request){
        let {data}=request;
    
        let userToken=JWTToken.getToken();

        var base64Payload = userToken.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        let infoUser=JSON.parse(payload.toString());

        let qrcode=await mediaModel.find([ {"id_user":infoUser.id ,"op":"=" },{"id_event":data,"op":"="},{"id_type":'2',"op":"="} ])
        qrcode = JSON.parse(JSON.stringify(qrcode));

        let fichier=qrcode[0].nom;
        let rootDir = path.resolve('./');
saveAs.saveAs("./public/image/"+fichier,rootDir+fichier);
        console.log(fichier)
    }

}


export default UserController;