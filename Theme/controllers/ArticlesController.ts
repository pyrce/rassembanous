
import { url } from "inspector";
import articleClass from "../Models/ArticlesModel";
import commentaireClass from "../Models/Commentaires";
import Request from "../../Core/services/Request";
import Render from "../../Core/Viewer/Render";


type route = { data: Object, view: String }

class ArticlesController {

    public static async getArticles() {
        try {
            let articles = await articleClass.findAll();
            articles = JSON.parse(JSON.stringify(articles));
     
            return Render.make('articles', { user: "toto", page: "detail", articles: articles })
        } catch (error) {
            console.log(error)
        }

    }

    public static async showArticle(request: Request) {
        const { data } = request;

        const id = data.params;

        var article = await articleClass.find({ "id": id }, commentaireClass);

        const view = Render.make("detail_article", { user: "toto", page: "detail", article: article });

        return view;

    }
    public static ajouterArticle() {

        const view = Render.make("ajout_article", { user: "toto", page: "Home" });

        return view;
    }

    public static async editerArticle(request: Request) {
        const { data } = request;

        const id = data.params;

        var article = await articleClass.find({ "id": id }, "");

        const view = Render.make("editer_article", { user: "toto", page: "detail", article: article[0] });

        return view;

    }

    public static updateArticle(req: Request) {
        const { data } = req;

        let titre = data.split("&")[0].split("=")[1]
        let contenue = data.split("&")[1].split("=")[1]
        let id = data.split("&")[2].split("=")[1]
        articleClass.update({ "id": id }, { "titre": titre, "contenu": contenue })

    }
    public static addArticle(request: Request) {
        const { data } = request;

        let titre = data.split("&")[0].split("=")[1]
        let contenue = data.split("&")[1].split("=")[1]

        articleClass.insert({ "auteur": "florent", "titre": titre, "contenu": contenue });


    }
    public static deleteArticle(request: Request) {
        try {


            const { data } = request;

            let id = data.split("=")[1]

            commentaireClass.delete({ "id_article": id });
            articleClass.delete({ "id": id });
        } catch (error) {
            console.log(error)
        }
    }


}

export default ArticlesController;