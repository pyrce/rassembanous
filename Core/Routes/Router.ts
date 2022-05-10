import MethodEnum from "./MethodEnum";
import Route from "./Route"
import * as Url  from 'url';
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

    public  static get(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.GET,url,middleware,callback);
    }

    public static post(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.POST,url,middleware,callback);
    }
    public static put(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.PUT,url,middleware,callback);
    }
    public static delete(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.DELETE,url,middleware,callback);
    }

    public add(method:string,url:string,middleware:any,callback:any){

        let maRoute=new Route(method,url,middleware,callback);

        this.routes.push(maRoute)
    }
    public static getAll() {
        return this.getInstance().routes;
    }
}

export default Router;