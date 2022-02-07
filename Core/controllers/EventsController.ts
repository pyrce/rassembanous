import Render from "../../Core/Views/Render";
import mediaModel from "../Models/MediaModel";
import eventsClass from "../Models/Events";
import eventsPartenaire from "../Models/EventPartenaire";
import Request from "../../Core/services/Request";
import * as path from "path";
import partenaireModel from "../Models/PartenaireModel";
import eventUser from "../Models/EventUser";
import * as jwt from "jsonwebtoken";
import config from "../routes/config/config";
import partenaireUser from "../Models/PartenaireUserModel";
import JWTToken from "../services/JWToken";
class EventsController {

    public static async getEvents() {

        try {
            let rootDir = path.resolve('./');

            let today = new Date().toISOString().substring(0,10)+" "+new Date().toLocaleTimeString();
            let currentEvents = await eventsClass.findAll([{ "dateLimit": today, "op": ">" }]);
            currentEvents = JSON.parse(JSON.stringify(currentEvents));

            let lastEvents = await eventsClass.findAll([{ "dateFin": ''+today+'', "op": "<" }]);
            lastEvents = JSON.parse(JSON.stringify(lastEvents));

            return Render.make('Events', { rootDir: rootDir, user: "toto", page: "detail", lastEvents: lastEvents, currentEvents: currentEvents })
        } catch (error) {

        }
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
             

            if (new Date(event[0].dateLimit).getTime() > new Date().getTime()) {

                let myEvent=await eventUser.find([{"id_event":event[0].id,"op":"="},{"id_user":infoUser.id,"op":"="}]);
                myEvent = JSON.parse(JSON.stringify(myEvent));
   console.log(myEvent)

                let estInscrit=myEvent.length>0 ? 1: 0;
                return Render.make('event', { estInscrit:estInscrit ,rootDir: rootDir, page: "detail", event: event[0] })
            } else {

                partenaireModel.setJoinTable([{ class: eventsPartenaire, "fk": "id_user" }]);


                let partenaires = await partenaireModel.findAll({ "id_event": id });

                partenaires = JSON.parse(JSON.stringify(partenaires));

                let gallerie = await mediaModel.findAll({ "id_event": id });
                gallerie = JSON.parse(JSON.stringify(gallerie));
        

                return Render.make('event_termine', { galleries: gallerie, partenaires: partenaires, rootDir: rootDir, page: "detail", event: event[0] })
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default EventsController;