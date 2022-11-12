import Router from "../../Core/Routes/Router";
import HomeController from "../controllers/HomeController";

import Request from "../../Core/services/Request";
import * as jwt from "jsonwebtoken";

import EventsController from "../controllers/EventsController";
import PartenairesController from "../controllers/PartenairesController";
import UsersController from "../controllers/UsersController";
import AdminController from "../controllers/AdminController";
import checkJwt from "./middleware/checkJWT";
import Multer from "./middleware/Multer";
import csurf from "csurf";

class Routes {

  static make() {



     Router.get("/", null,HomeController.getHome)


    Router.get("/api/events", null, EventsController.getEvents)

    Router.get("/api/categories", null, EventsController.getCategories)
    Router.get("/api/lieus", null, EventsController.getLieu)
    Router.post("/api/allevents", null, EventsController.getAllEvents)
    Router.post("/api/galleries", null, EventsController.getGallerie)
    Router.post("/api/events", { id_role: 1 }, EventsController.addEvent)
    Router.post("/api/events/questions", null, AdminController.getEventQuestionnaire);
    Router.get("/api/events/:id", null, EventsController.getEvent)
    Router.post("/api/events/:id", null, EventsController.updateEvent)
    Router.get("/api/ajoutevent", Multer, EventsController.ajoutEvent)

    Router.get("/api/partenaires", null, PartenairesController.getPartenaires)
    Router.post("/api/partenaires/events", null, PartenairesController.getEvents)
    Router.post("/api/partenaires/events/get", { isAuth: true, id_role: 3 }, PartenairesController.getMyEvent)
    Router.get("/api/partenaires/list", null, PartenairesController.getListPartenaires)
    Router.get("/api/partenaires/:id", null, PartenairesController.getPartenaire)

    Router.post("/api/partenaires/follow", null, UsersController.follow)
    Router.post("/api/users", null, UsersController.getUser)
    Router.post("/api/users/inscription", null, UsersController.inscrire)
    Router.get("/api/user/profil", null, UsersController.getUserProfil)
    Router.post("/api/users/profil", { isAuth: true }, UsersController.updateProfil)
    Router.post("/api/users/signup", null, UsersController.signup)
    Router.post("/api/users/logout", null, UsersController.logout)
    Router.post("/api/users/qrcode", null, UsersController.getQRCODE)
    Router.post("/api/users/partner", null, UsersController.becomePartner)
    Router.post("/api/users/questionnaire", { isAuth: true }, UsersController.repondreQuestionnaire)

    Router.post("/api/admin/users", { isAuth: true, id_role: 1 }, AdminController.getUsers);
    Router.get("/api/admin/categories", { isAuth: true, id_role: 1 }, AdminController.getCategories);
    Router.post("/api/admin/categories", { isAuth: true, id_role: 1 }, AdminController.addCategorie);
    Router.post("/api/admin/users/add", { isAuth: true, id_role: 1 }, AdminController.addUser);
    Router.put("/api/admin/users", { isAuth: true, id_role: 1 }, AdminController.updateUser);
    Router.post("/api/admin/users/delete", { isAuth: true, id_role: 1 }, AdminController.deleteUser);
    Router.post("/api/admin/partenaires", { isAuth: true, id_role: 1 }, AdminController.attribuerStand);
    Router.get("/api/questions", { isAuth: true, id_role: 1 }, AdminController.listeQuestions);
    Router.post("/api/questions/:id", { isAuth: true, id_role: 1 }, AdminController.getQuestions);
    Router.post("/api/questions", { id_role: 1 }, AdminController.submitQuestionnaire);
    Router.post("/api/stats", { isAuth: true, id_role: 1 }, AdminController.eventStats);
    Router.delete("/api/galleries", { isAuth: true, id_role: 1 }, AdminController.deleteImage);
    Router.post("/contact", null, HomeController.contact);
    Router.get("/api/login", null, HomeController.login)
    Router.post("/api/identifier", null, HomeController.identifier)
  }
}

export default Routes;