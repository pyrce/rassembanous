import Router from "../../Core/Routes/Router";
import HomeController from "../controllers/HomeController";

import Request from "../../Core/services/Request";
import * as jwt from "jsonwebtoken";
import config from "../routes/config/config";
import EventsController from "../controllers/EventsController";
import PartenairesController from "../controllers/PartenairesController";
import UsersController from "../controllers/UsersController";
import checkJwt  from "./middleware/checkJWT";
class Routes {

    static make() {

  
           
       Router.get("/", null,HomeController.getHome)
       Router.get("/login",null,HomeController.login )
       Router.post("/identifier",null,HomeController.identifier )


       Router.get("/events", null, EventsController.getEvents )
       Router.post("/events", checkJwt, EventsController.addEvent )
       Router.get("/ajoutevent",checkJwt,  EventsController.ajoutEvent )
       Router.get("/events/:id",  null, EventsController.getEvent )


       Router.get("/partenaires", null, PartenairesController.getPartenaires )
       Router.get("/partenaires/list", checkJwt, PartenairesController.getListPartenaires )
       Router.get("/partenaires/:id", null, PartenairesController.getPartenaire )


       Router.post("/partenaires/follow", null, UsersController.follow )
       Router.post("/events/inscription", null, UsersController.inscrire )
       Router.post("/users",null, UsersController.getUser )
       Router.post("/users/profil",[checkJwt], UsersController.updateProfil )
       Router.get("/users/:id",[checkJwt], UsersController.getUserProfil )
       Router.post("/users/qrcode",[checkJwt], UsersController.getQRCODE )
    }
}

export default Routes;