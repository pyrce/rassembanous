import RouteInterface from "../Interface/RouteInterface";

class Route implements RouteInterface{

params:any;

    constructor(public url:String,public middleware:any,public callback:any,public method:String) {
        this.params=":" + url.split(':')[1];
  
    }



}

export default Route;