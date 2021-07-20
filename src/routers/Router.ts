import MethodEnum from "./MethodEnum";
import Route from "./Route"

class Router
{
    private static _instance: Router;
   // private maRoute : Route;
    private routes: Array<any> = [];
    private constructor()
    {
        //...
       // this.maRoute=new Route();
    
    }

    public static getInstance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public  get(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.GET,url,callback);
    }

    public static post(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.POST,url,callback);
    }
    public static push(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.PUSH,url,callback);
    }
    public static delete(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.DELETE,url,callback);
    }

    public add(method:String,url:String,callback:any){

        let maRoute=new Route(url,callback,method);

        this.routes.push(maRoute)
    }
    public static getAll() {
        return this.getInstance().routes;
    }
}

export default Router;