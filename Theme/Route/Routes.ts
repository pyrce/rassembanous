import Router from "../../Core/Routes/Router";
import HomeController from "../controllers/HomeController";
import ContactController from "../controllers/ContactController";
import ArticlesController from "../controllers/ArticlesController";
import Request from "../../Core/services/Request";
import CommentairesController from "../controllers/CommentairesController";

class Routes {

    static make() {

        Router.get("/", ()=>{ return HomeController.getHome() })
        
 

        Router.get("/articles", 
         
          ArticlesController.getArticles
        

         )
    

      Router.get("/articles/ajouter",   ArticlesController.ajouterArticle);
      
      Router.get("/articles/editer/:id",   ArticlesController.editerArticle); 
           
      Router.put("/articles/update",  ArticlesController.updateArticle); 

        Router.post("/articles/add",ArticlesController.addArticle);
        Router.delete("/articles/delete",ArticlesController.deleteArticle);
       Router.get("/articles/:id", 
        async  (req:Request)=>{return await ArticlesController.showArticle(req) }
    
         )
       
        Router.post("/comments/add", CommentairesController.addComments);
        Router.delete("/comments/delete", CommentairesController.deleteComments);
        Router.get("/contact", ContactController.getContact());

    }
}

export default Routes;