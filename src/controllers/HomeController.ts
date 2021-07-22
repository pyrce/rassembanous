import ArticlesModel from "../database/ArticlesModel";
import Render from "../views/Render";

type route = { data: Object, view: String }

class HomeController {

    public static getHome() {
        var articles = ArticlesModel.findAll();

        return articles;

    }

    public static getArticle() {
        var article = ArticlesModel.findById(1);

        return article;

    }
}

export default HomeController;