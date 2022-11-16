import RouteInterface from "../Interface/RouteInterface";

class Route implements RouteInterface{

params:any;

    constructor(public method:String,public url:string,public middleware:any,public callback:any) {
        this.params=":" + url.split(':')[1];
    }



}

export default Route;