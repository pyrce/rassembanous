import Router from "./Router";
import HomeController from "../controllers/HomeController";
import ContactController from "../controllers/ContactController";
import Render from "../views/Render";
import ArticlesController from "../controllers/ArticlesController";
class Routes {

    static make() {

        Router.get("/", HomeController.getHome())

        Router.get("/articles", ArticlesController.getArticles().then(async (article: any) => {


            const view = Render.make("articles", { user: "toto", page: "Articles", articles: article });

            return view;

        }))

        Router.get("/articles/1", ArticlesController.getArticles().then(async (article: any) => {


            const view = Render.make("detail_article", { user: "toto", page: "detail", articles: article });

            return view;

        }))

        Router.get("/contact", ContactController.getContact());

    }
}

export default Routes;