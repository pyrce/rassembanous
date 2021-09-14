
import Render from "../../Core/Viewer/Render";

type route = { data: Object, view: String }

class HomeController {

    public static getHome() {
 
        const view = Render.make("home", { user: "toto", page: "Home" });

        return view;

    }

}

export default HomeController;