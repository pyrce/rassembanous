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
        instance.add(MethodEnum.GET,middleware,url,callback);
    }

    public static post(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.POST,middleware,url,callback);
    }
    public static put(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.PUT,middleware,url,callback);
    }
    public static delete(url:string,middleware:any,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.DELETE,middleware,url,callback);
    }

    public add(method:string,middleware:any,url:string,callback:any){

        let maRoute=new Route(url,middleware,callback,method);

        this.routes.push(maRoute)
    }
    public static getAll() {
        return this.getInstance().routes;
    }
    public static filterRoute(url:string){
        return this.getAll().filter(route=>{return route.url=url })
    }
    public static updateRoute(url:string,params?:any){
        let route=this.filterRoute(url);
        route[0].params=params

    }
}

export default Router;