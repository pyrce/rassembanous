import Router  from "./Router";
import HomeController from "../controllers/HomeController";
import ContactController from "../controllers/ContactController";
import Render from "../views/Render";
import { resolveInclude } from "ejs";


class Routes{

    static make(){

        Router.get("/", HomeController.getHome().then( async(m:any)=>{


     const view=  Render.make("home",{user:"toto",page:"Home",articles:m});

     return view;
    
      

        }) )

        // Router.get("/articles/1", HomeController.getArticle().then( async(m:any)=>{


        //     const view=  Render.make("home",{user:"toto",page:"Home",articles:m});
       
        //     return view;
           
             
       
        //        }) )
        Router.get("/contact",ContactController.getContact());

    }
}

export default Routes;