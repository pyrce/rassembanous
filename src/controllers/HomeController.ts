type route={data:Object,view:String }

class HomeController{

getHome() :route{
    return{
        view:"home",
        data:{user:"toto",page:"Home"}
    }
}

}

export default new HomeController();