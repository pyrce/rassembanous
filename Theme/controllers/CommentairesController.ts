
import { url } from "inspector";

import commentaireClass from "../Models/Commentaires";
import Request from "../../Core/services/Request";



class CommentairesController {

    public static addComments(req:Request) {
       
   const {data}=req
let auteur=data.split("&")[1].split("=")[1]
let article=data.split("&")[0].split("=")[1]
let commentaire=data.split("&")[2].split("=")[1]

commentaireClass.insert({"id_article":article,"auteur":auteur,"commentaire":commentaire});
         //  return Render.make('articles',{ user: "toto", page: "detail", articles: articles })


    }

public static deleteComments(req:Request){
    const {data}=req
    const id         = data.split("=")[1]; 
    console.log(id)
    commentaireClass.delete({"id":id});
}

}

export default CommentairesController;