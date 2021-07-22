import { IncomingMessage } from 'http';

class Request{


 url:String
 method:String

    constructor(req:IncomingMessage) {
     this.url=req.url || "/"
     this.method =req.method || "GET"   
    }


}

export default Request;