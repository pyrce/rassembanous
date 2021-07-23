import ArticlesModel from "../database/ArticlesModel";
import Render from "../views/Render";

type route = { data: Object, view: String }

class HomeController {

    public static getHome() {
 
        const view = Render.make("home", { user: "toto", page: "Home" });

        return view;

    }

    public static getArticle() {

      
        var article = ArticlesModel.findById(1);

        return article;

    }
}

export default HomeController;