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

    public  static get(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.GET,url,callback);
    }

    public static post(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.POST,url,callback);
    }
    public static put(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.PUT,url,callback);
    }
    public static delete(url:string,callback:any){
        const instance=Router.getInstance();
        instance.add(MethodEnum.DELETE,url,callback);
    }

    public add(method:string,url:string,callback:any){

        let maRoute=new Route(url,callback,method);

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