
import Render from "../../Core/Views/Render";
import Request from "../services/Request";
type route = { data: Object, view: String }
import * as path from "path";
import Response from "../services/Reponse";
import partenaireModel from "../Models/PartenaireModel";
import JWTToken from "../services/JWToken";

class HomeController {

    public static getHome() {
 
        let userToken=JWTToken.getToken();

        var base64Payload = userToken.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        let infoUser=JSON.parse(payload.toString());

        const view = Render.make("home", { user: infoUser, page: "Home" });

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

        let user=await partenaireModel.find({"login":data.login});
        user = JSON.parse(JSON.stringify(user));
       

if(user.length>0){
 
        if(user[0].password==data.password){
            let userData={ userId :user[0].id,role:user[0].id_role,nom:user[0].nom,prenom:user[0].prenom }
            JWTToken.makeJWT(userData);
            console.log("connecté")
            return JSON.stringify({msg:'ok'});
        }
    }else{
     console.log("user not found")
    }
      
    }

}

export default HomeController;