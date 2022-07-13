"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("../../Core/Routes/Router"));
const HomeController_1 = __importDefault(require("../controllers/HomeController"));
const EventsController_1 = __importDefault(require("../controllers/EventsController"));
const PartenairesController_1 = __importDefault(require("../controllers/PartenairesController"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const Multer_1 = __importDefault(require("./middleware/Multer"));
class Routes {
    static make() {
        // Router.get("/", null,HomeController.getHome)
        Router_1.default.get("/api/login", null, HomeController_1.default.login);
        Router_1.default.post("/api/identifier", null, HomeController_1.default.identifier);
        Router_1.default.get("/api/categories", null, EventsController_1.default.getCategories);
        Router_1.default.get("/api/lieus", null, EventsController_1.default.getLieu);
        Router_1.default.get("/api/events", null, EventsController_1.default.getEvents);
        Router_1.default.post("/api/allevents", null, EventsController_1.default.getAllEvents);
        Router_1.default.post("/api/galleries", null, EventsController_1.default.getGallerie);
        Router_1.default.post("/api/events", { id_role: 1 }, EventsController_1.default.addEvent);
        Router_1.default.post("/api/events/questions", null, AdminController_1.default.getEventQuestionnaire);
        Router_1.default.get("/api/events/:id", null, EventsController_1.default.getEvent);
        Router_1.default.post("/api/events/:id", null, EventsController_1.default.updateEvent);
        Router_1.default.get("/api/ajoutevent", Multer_1.default, EventsController_1.default.ajoutEvent);
        Router_1.default.get("/api/partenaires", null, PartenairesController_1.default.getPartenaires);
        Router_1.default.post("/api/partenaires/events", null, PartenairesController_1.default.getEvents);
        Router_1.default.post("/api/partenaires/events/get", { isAuth: true, id_role: 3 }, PartenairesController_1.default.getMyEvent);
        Router_1.default.get("/api/partenaires/list", null, PartenairesController_1.default.getListPartenaires);
        Router_1.default.get("/api/partenaires/:id", null, PartenairesController_1.default.getPartenaire);
        Router_1.default.post("/api/partenaires/follow", null, UsersController_1.default.follow);
        Router_1.default.post("/api/users", null, UsersController_1.default.getUser);
        Router_1.default.post("/api/users/inscription", null, UsersController_1.default.inscrire);
        Router_1.default.get("/api/user/profil", null, UsersController_1.default.getUserProfil);
        Router_1.default.post("/api/users/profil", { isAuth: true }, UsersController_1.default.updateProfil);
        Router_1.default.post("/api/users/signup", null, UsersController_1.default.signup);
        Router_1.default.post("/api/users/logout", null, UsersController_1.default.logout);
        Router_1.default.post("/api/users/qrcode", null, UsersController_1.default.getQRCODE);
        Router_1.default.post("/api/users/partner", null, UsersController_1.default.becomePartner);
        Router_1.default.post("/api/users/questionnaire", { isAuth: true }, UsersController_1.default.repondreQuestionnaire);
        Router_1.default.post("/api/admin/users", { isAuth: true, id_role: 1 }, AdminController_1.default.getUsers);
        Router_1.default.get("/api/admin/categories", { isAuth: true, id_role: 1 }, AdminController_1.default.getCategories);
        Router_1.default.post("/api/admin/categories", { isAuth: true, id_role: 1 }, AdminController_1.default.addCategorie);
        Router_1.default.post("/api/admin/users/add", { isAuth: true, id_role: 1 }, AdminController_1.default.addUser);
        Router_1.default.put("/api/admin/users", { isAuth: true, id_role: 1 }, AdminController_1.default.updateUser);
        Router_1.default.post("/api/admin/users/delete", { isAuth: true, id_role: 1 }, AdminController_1.default.deleteUser);
        Router_1.default.post("/api/admin/partenaires", { isAuth: true, id_role: 1 }, AdminController_1.default.attribuerStand);
        Router_1.default.get("/api/questions", { isAuth: true, id_role: 1 }, AdminController_1.default.listeQuestions);
        Router_1.default.post("/api/questions/:id", { isAuth: true, id_role: 1 }, AdminController_1.default.getQuestions);
        Router_1.default.post("/api/questions", { id_role: 1 }, AdminController_1.default.submitQuestionnaire);
        Router_1.default.post("/api/stats", { isAuth: true, id_role: 1 }, AdminController_1.default.eventStats);
        Router_1.default.delete("/api/galleries", { isAuth: true, id_role: 1 }, AdminController_1.default.deleteImage);
        Router_1.default.post("/contact", null, HomeController_1.default.contact);
    }
}
exports.default = Routes;
//# sourceMappingURL=Routes.js.map