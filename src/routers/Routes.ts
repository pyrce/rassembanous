import Router  from "./Router";
import HomeController from "../controllers/HomeController";
import ContactController from "../controllers/ContactController";


class Routes{

    static make(){

        Router.getInstance().get("/",HomeController.getHome() )

        Router.getInstance().get("/contact",ContactController.getContact());

    }
}

export default Routes;