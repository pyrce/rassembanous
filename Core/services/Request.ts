import { IncomingMessage } from 'http';
import MethodEnum from '../Routes/MethodEnum';
const url = require('url');
class Request {


    public req: IncomingMessage
    public method: any
    public url: any
    public data: any

    constructor(req: IncomingMessage) {
        this.req = req
        this.url = req.url
        this.method = req.method

    }




    public async setData(req:IncomingMessage) {
    
        let baseURI = url.parse(req.url, true);
        let path = baseURI.pathname?.split('/');
        let params = path?.slice(1)[path.length - 2];
        let query = baseURI.query;
        let body: any;

        switch (this.method) {
            case MethodEnum.GET:
                this.url = url.parse(req.url).pathname
                this.data = { params, query }
                break;
            case MethodEnum.POST:
                this.data = await Promise.resolve(this.parseBody(req))
                break;
            case MethodEnum.PUT:
                this.data = await Promise.resolve(this.parseBody(req))
                break;
            case MethodEnum.DELETE:
                this.data = await Promise.resolve(this.parseBody(req))
                break;
            default:
                break;
        }     
    }

    private parseBody(req:IncomingMessage) {
        let body: Array<any> = [];
        return new Promise((resolve, reject) => {
            req.on('data', (chunk: any) => {
                body.push(chunk)
            }).on('end', () => {
       
                const parsedBody = Buffer.concat(body).toString();

                return resolve(parsedBody)
            });
        })
    }

    public static async instance(req: IncomingMessage){
        const request = new Request(req)
        await request.setData(req)
        return request
    }
}

export default Request;