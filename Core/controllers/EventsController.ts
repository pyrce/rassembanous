import Render from "../../Core/Views/Render";
import mediaModel from "../Models/MediaModel";
import eventsClass from "../Models/Events";
import eventsPartenaire from "../Models/EventPartenaire";
import Request from "../../Core/services/Request";
import * as path from "path";
import partenaireModel from "../Models/PartenairesModel";
import eventUser from "../Models/EventUser";
import * as jwt from "jsonwebtoken";
import config from "../routes/config/config";
import partenaireUser from "../Models/PartenaireUserModel";
import JWTToken from "../services/JWToken";

class EventsController {

    public static async getEvents(request: Request) {

        try {
            let rootDir = path.resolve('./');
            const { data } = request;
            let queryLimit:any={}
            queryLimit["limit"]=data.limit
            queryLimit["offset"]=data.offset
            console.log("query");
     
            let today = new Date().toISOString().substring(0,10)+" "+new Date().toLocaleTimeString();
            let currentEvents = await eventsClass.findAll([{ "dateLimit": today, "op": ">" }],queryLimit);
            currentEvents = JSON.parse(JSON.stringify(currentEvents));

            let lastEvents = await eventsClass.findAll([{ "dateFin": ''+today+'', "op": "<" }],queryLimit);
            lastEvents = JSON.parse(JSON.stringify(lastEvents));
            let response={lastEvents:lastEvents,currentEvents:currentEvents}
      
return JSON.stringify(response);
          //  return Render.make('Events', { rootDir: rootDir, user: "toto", page: "detail", lastEvents: lastEvents, currentEvents: currentEvents })
        } catch (error) {

        }
    }

    public static async getAllEvents(request: Request){
        let { data } = request;
        data=JSON.parse(data);
        let queryLimit:any={}
        queryLimit["limit"]=data.limit
        queryLimit["offset"]=data.offset

        let response={};
        let total={};
            let today = new Date().toISOString().substring(0,10)+" "+new Date().toLocaleTimeString();

        if(data.type=="recent"){
        
            let currentEvents = await eventsClass.findAll([{ "dateLimit": today, "op": ">" }],queryLimit);
            let total = await eventsClass.findAll([{ "dateLimit": today, "op": ">" }],{});
            currentEvents = JSON.parse(JSON.stringify(currentEvents));
            total = JSON.parse(JSON.stringify(total)).length;
            response={listEvents:currentEvents,total:total};

        }else{

            let lastEvents = await eventsClass.findAll([{ "dateFin": ''+today+'', "op": "<" }],queryLimit);
            let total = await eventsClass.findAll([{ "dateFin": today, "op": "<" }],{});
            total = JSON.parse(JSON.stringify(total)).length;
            lastEvents = JSON.parse(JSON.stringify(lastEvents));
            response={listEvents:lastEvents,total:total};

        }
        return JSON.stringify(response);

    }
    public static ajoutEvent() {
        let rootDir = path.resolve('./');
        return Render.make('ajout_event', { rootDir: rootDir })
    }

    public static async addEvent(request: Request) {
        let { data } = request;
        // data= decodeURIComponent(data.replace(/\+/g, ' '))
        data = JSON.parse(data);
        let partenaires = data.partenaires;

        for(let index in data){
            data[index]= EventsController.escapeHtml( data[index]);
        }
        let newEvent = await eventsClass.insert({
            "nom": data["nom"],
            "dateDebut": data["dateDebut"],
            "nbPlace": data["nbPlace"],
            "prix": data["prix"],
            "lieu": data["lieu"],
            "dateLimit": data["dateLimit"],
            "isPublic": data["isPublic"],
            "description": data["description"],
            "dateFin": data["dateFin"]
        });
        let follows=[];
        partenaires.forEach(async (element: any) => {
            let f=await partenaireUser.find([{"id_user":5,"op":"="},{"id_partenaire":element.id,"op":"="}]);
            f = JSON.parse(JSON.stringify(f));
            if( f.length>0){
              //  follows.push(element.nomSoc)
            }
            eventsPartenaire.insert({ "id_event": newEvent.insertId, "id_user": element.id })
        });



    }
    public static async getEvent(request: Request) {

        try {
            const { data } = request;

            const id = data.params;

            let event = await eventsClass.find({ id: id });

            event = JSON.parse(JSON.stringify(event));
            let rootDir = path.resolve('./');

                let userToken=JWTToken.getToken();

                var base64Payload = userToken.split('.')[1];
                var payload = Buffer.from(base64Payload, 'base64');
                let infoUser=JSON.parse(payload.toString());
             
let response={};
            if (new Date(event[0].dateLimit).getTime() > new Date().getTime()) {

                let myEvent=await eventUser.find([{"id_event":event[0].id,"op":"="},{"id_user":infoUser.id,"op":"="}]);
                myEvent = JSON.parse(JSON.stringify(myEvent));


                let estInscrit=myEvent.length>0 ? 1: 0;
                response= { estInscrit:estInscrit , estTermine: 0, event: event[0] }
               // return Render.make('event', { estInscrit:estInscrit ,rootDir: rootDir, page: "detail", event: event[0] })
            } else {

                partenaireModel.setJoinTable([{ class: eventsPartenaire, "fk": "id_user" }]);


                let partenaires = await partenaireModel.findAll({ "id_event": id });

                partenaires = JSON.parse(JSON.stringify(partenaires));

                let gallerie = await mediaModel.findAll({ "id_event": id });
                gallerie = JSON.parse(JSON.stringify(gallerie));
                
response={ galleries: gallerie, partenaires: partenaires, estTermine:1, event: event[0] }
               // return Render.make('event_termine', { galleries: gallerie, partenaires: partenaires, rootDir: rootDir, page: "detail", event: event[0] })
            }

            return JSON.stringify(response);
        } catch (error) {
            console.log(error)
        }
    }

    private static escapeHtml(text:any) {
        var map:any = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
        
        return text.replace(/[&<>"']/g, function(m:any) { return map[m]; });
      }

}

export default EventsController;