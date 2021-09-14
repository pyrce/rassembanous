import Render from "../../Core/Viewer/Render";

type route={data:Object,view:String }

class ContactController{

getContact() {
    const view=Render.make("Contact",{user:"toto",page:"Contact"});
    return view;
}

}

export default new ContactController();