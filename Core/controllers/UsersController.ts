import Render from "../../Core/Views/Render";;
import * as jwt from "jsonwebtoken";
import Request from "../../Core/services/Request";
import * as path from "path";

import Response from "../services/Reponse";
import * as qrcode from "qrcode";
import JWTToken from "../services/JWToken";
import * as fs from "fs";

import { saveAs } from 'file-saver';
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: [
		{
			emit: 'stdout',
			level: 'info'
		},
		{
			emit: 'stdout',
			level: 'warn'
		},
		{
			emit: 'event',
			level: 'query'
		}
	],
  });

  prisma.$on('query', async (e) => {

     console.log(`${e.query} ${e.params} \n`)

  });
class UserController {

    public static async inscrire(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        
        let dateJour = new Date();
        let nom:any = dateJour.getDate() + dateJour.getMonth() + dateJour.getFullYear() + "_" + dateJour.getHours() + dateJour.getMinutes() + dateJour.getSeconds();

        let userToken = await JWTToken.getUser();
        if (userToken != false) {
            await prisma.event_user.create({ data:{id_event: data, "id_user": userToken.userId} });
        
            qrcode.toFile(
                './public/image/' + nom + '.png',
                [{ data: userToken.nom + " " + userToken.prenom, mode: 'byte' }],
                {
                    scale: 4,
                    width: 800
                },
               async function () {

                   await prisma.media.create({data:{ id_event: data, id_user: userToken.id, id_type: 2, "image": nom+".png"} });
                    console.log("cb");
                }
               
            )
             return JSON.stringify({"msg":"ok"});
        }else{
            return JSON.stringify({"msg":"KO"});
        }


    }

    public static async signup(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        for (let index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }

        bcrypt.hash(data["password"], 1, async function (err, hash) {
            // Store hash in your password DB.

            let user = await prisma.users.create({data:{
                "nom": data.nom,
                "prenom": data.prenom,
                "login": data.login,
                "password": hash,
                "id_role":2,
                "email": data.email,
                "adresse": data.adresse
            }
            });
        });

        console.log("inserted")
    }


    public static async logout() {

       await JWTToken.logout();
        return JSON.stringify({ msg: "OK" });

    }

    public static async follow(request: Request) {

        let { data } = request;
let user= await JWTToken.getUser();
console.log("user connecté");
console.log(user)
if(user){
      await  prisma.partenaire_user.create({data:{ id_partenaire: parseInt(data), id_user: user.userId} });
      return JSON.stringify({msg:"Ok"})
}else{
    return JSON.stringify({msg:"KO"})
}
    }

    public static async getUser() {

        let userToken =await JWTToken.getUser();
      console.log("my token")
         console.log(userToken)
        if ( userToken ) {
   

            return JSON.stringify(userToken);
        } else {
            return JSON.stringify({ msg: "ko" });
        }
    }

    public static async getUserProfil() {

        let userToken = JWTToken.getToken();
   
        if (typeof userToken != "undefined") {
 
            let infoUser =await JWTToken.getUser();

            let id = infoUser.userId;

            let user = await prisma.users.findFirst({where: { id: id }});

           // user = JSON.parse(JSON.stringify(user));

            return JSON.stringify(user);
        } else {
            console.log("ko")
            return JSON.stringify({ "msg": "ko" });
        }
        //return Render.make('profil', { user:user[0],rootDir:rootDir })

    }

    public static async updateProfil(request: Request) {
        let { data } = request;

        let userToken = JWTToken.getToken();
        if (userToken) {
            var base64Payload = userToken.split('.')[1];
            var payload = Buffer.from(base64Payload, 'base64');
            let infoUser = JSON.parse(payload.toString());

            await prisma.users.update({data:data,where:{id:infoUser.id}})
            //partenaireModel.update({ id: infoUser.id }, data);
        }
    }

    public static async getQRCODE(request: Request) {
        let { data } = request;
        data = JSON.parse(data);

        // let userToken = JWTToken.getToken();

        // var base64Payload = userToken.split('.')[1];
        // var payload = Buffer.from(base64Payload, 'base64');
        // let infoUser = JSON.parse(payload.toString());

        let qrcode:any = await prisma.media.findFirst({
            where:{ id_user:1, "id_event": data.id, "id_type": 2 }
        });
        //qrcode = JSON.parse(JSON.stringify(qrcode));

        if(qrcode!=null){
        let fichier = qrcode.image;
        let rootDir = path.resolve('./');
   
        var code = fs.readFileSync("./public/image/"+fichier ,'base64');


        return JSON.stringify({code:code});
        }else{
            return JSON.stringify({ "msg": "ko" });
        }
        
    }

    public static async repondreQuestionnaire(request: Request){
        let { data } = request;
        data = JSON.parse(data);

        let userToken = JWTToken.getToken();

        if(userToken){
   }
let questionsUser:any = await prisma.questions.findMany({
    where:{ id_questionnaire:data.questionnaire },
    include:{users:{where:{id_user: 1 }}}

})


        data.forEach(async (element:any)=>{

  let quest:any=questionsUser[0].users.filter((q:any)=>q.id_user==element.id_user);
console.log("quest");
console.log(quest);
if(quest.length>0){

    await prisma.question_user.update({ data:{ stars:element.stars} ,where:{ id :quest[0].id } })
}else{

    await prisma.question_user.create({
        data:{
            id_user:1,
            id_question:element.id_question,
            stars:element.stars
        }

    })
}


        } );
 

        return JSON.stringify({ "msg": "ok" });
    }

    public static   becomePartner(request: Request){
        let { data } = request;
        data = JSON.parse(data);
        for (let index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }

        bcrypt.hash(data.password, 1, async function (err, hash) {
            // Store hash in your password DB.
console.log(err);
             await prisma.users.create({ data:{
                "nom": data.nom,
                "prenom": data.prenom,
                "login": data.login,
                "password": hash,
                "id_role":3,
                "token":"",
                "email": data.email,
                "adresse": data.adresse,
            }
            });
        });

        console.log("inserted")
        return JSON.stringify({ "msg": "ok" });
    }
    private static escapeHtml(text: any) {
        var map: any = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m: any) { return map[m]; });
    }

}


export default UserController;