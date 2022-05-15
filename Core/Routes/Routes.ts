import Router from "../../Core/Routes/Router";
import HomeController from "../controllers/HomeController";

import Request from "../../Core/services/Request";
import * as jwt from "jsonwebtoken";

import EventsController from "../controllers/EventsController";
import PartenairesController from "../controllers/PartenairesController";
import UsersController from "../controllers/UsersController";
import AdminController from "../controllers/AdminController";
import checkJwt  from "./middleware/checkJWT";
import Multer  from "./middleware/Multer";
import csurf from "csurf";

class Routes {

    static make() {

  
           
      // Router.get("/", null,HomeController.getHome)
       Router.get("/login",null,HomeController.login )
       Router.post("/identifier",null,HomeController.identifier )


       Router.get("/categories",null, EventsController.getCategories )
       Router.get("/lieus",null, EventsController.getLieu )
       Router.post("/allevents",null, EventsController.getAllEvents )
       Router.post("/galleries",null, EventsController.getGallerie )
       Router.post("/events/questions",null, AdminController.getEventQuestionnaire );
       Router.post("/events",null, EventsController.addEvent )
       Router.get("/events",null, EventsController.getEvents )
       Router.get("/events/:id",null, EventsController.getEvent )
       Router.post("/events/:id",null, EventsController.updateEvent )
       Router.get("/ajoutevent",Multer,  EventsController.ajoutEvent )

       Router.get("/partenaires",null, PartenairesController.getPartenaires )
       Router.post("/partenaires/events",null, PartenairesController.getEvents )
       Router.post("/partenaires/events/get",null, PartenairesController.getMyEvent )
       Router.get("/partenaires/list",null, PartenairesController.getListPartenaires )
       Router.get("/partenaires/:id",null, PartenairesController.getPartenaire )

       Router.post("/partenaires/follow",null,  UsersController.follow )
       Router.post("/users",null, UsersController.getUser )
       Router.post("/users/inscription",null,  UsersController.inscrire )
       Router.get("/user/profil",null, UsersController.getUserProfil )
       Router.post("/users/profil",null, UsersController.updateProfil )
       Router.post("/users/signup",null, UsersController.signup )
       Router.post("/users/logout",null, UsersController.logout )
       Router.post("/users/qrcode",null, UsersController.getQRCODE )
       Router.post("/users/partner",null, UsersController.becomePartner )
       Router.post("/users/questionnaire",null, UsersController.repondreQuestionnaire )
       
       Router.post("/admin/users",null, AdminController.getUsers );
       Router.post("/admin/users/add",null, AdminController.addUser );
       Router.put("/admin/users",null, AdminController.updateUser );
       Router.post("/admin/users/delete",null, AdminController.deleteUser );
       Router.post("/admin/partenaires",null, AdminController.attribuerStand );
       Router.get("/questions",null, AdminController.listeQuestions );
       Router.post("/questions/:id",null, AdminController.getQuestions );
       Router.post("/questions",null, AdminController.submitQuestionnaire );
       Router.post("/stats",null, AdminController.eventStats );

       Router.post("/contact",null, HomeController.contact );
    }
}

export default Routes;