
import ArticlesModel from "../database/ArticlesModel";


type route = { data: Object, view: String }

class ArticlesController {

    public static  getArticles() {
        var articles =  ArticlesModel.findAll();

        return articles;

    }

    public static showArticle(id:any) {


        var article = ArticlesModel.findById(1);

        return article;

    }
}

export default ArticlesController;