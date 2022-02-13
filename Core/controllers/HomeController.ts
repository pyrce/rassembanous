
import Render from "../../Core/Views/Render";
import Request from "../services/Request";
type route = { data: Object, view: String }
import * as path from "path";
import Response from "../services/Reponse";
import partenaireModel from "../Models/PartenairesModel";
import JWTToken from "../services/JWToken";
import UsersModel from "../Models/UsersModel";
import bcrypt from "bcrypt"
class HomeController {

    public static getHome() {
 
        let rootDir = path.resolve('./');

        let userToken=JWTToken.getToken();

        var base64Payload = userToken.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        let infoUser=JSON.parse(payload.toString());

        const view = Render.make("home", { rootDir:rootDir,user: infoUser, page: "Home" });

        return view;

    }

    public static login(){
        let rootDir = path.resolve('./');

        const view = Render.make("login", {rootDir:rootDir,user: "toto", page: "Home"   });

        return view;
    }

    public static async identifier(req: Request){
        let {data}=req;
        data = JSON.parse(data);

        let user=await UsersModel.find({"login":data.login});
        user = JSON.parse(JSON.stringify(user));
       

if(user.length>0){
 
    bcrypt.compare(data.passowrd, user[0].password, function(err, result) {

            let userData={ userId :user[0].id,role:user[0].id_role,nom:user[0].nom,prenom:user[0].prenom }
           JWTToken.makeJWT(userData);
           let userToken=JWTToken.getToken();
     
            console.log("connecté")
            return JSON.stringify({msg:'connecter',token:userToken});
      });    
    }else{
     console.log("user not found")
    }
      
    }

}

export default HomeController;