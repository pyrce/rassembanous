const sum = require('./sum')
const event= require("./event")
import { IncomingMessage } from 'http';
import EventsController from "../Core/controllers/EventsController";
import Request from "../Core/services/Request";
const app = require('../Core/services/Server')
//const request=require("./request")

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
  //  return event.getUserName(1).then(data => expect(data).toEqual('dance1'));
 let im=new IncomingMessage();
 im.url="/events/1";
  im.data= { params: 1, query: [] }
  let request=new Request(im);



  let res=await EventsController.getEvent(request);
  console.log(res)
expect(res.event.nom).toEqual("dance1");
  })
})