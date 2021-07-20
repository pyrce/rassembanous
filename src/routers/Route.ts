import RouteInterface from "./RouteInterface";

class Route implements RouteInterface{



    constructor(public url:String,public callback:any,public method:String) {

  
    }



}

export default Route;