type route={data:Object,view:String }

class ContactController{

getContact() :route{
    return{
        view:"Contact",
        data:{user:"Tom",page:"Home"}
    }
}

}

export default new ContactController();