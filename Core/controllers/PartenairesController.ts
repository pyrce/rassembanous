import Render from "../../Core/Views/Render";
import partenaireClass from "../Models/PartenaireModel";
import eventsClass from "../Models/Events";
import EventPartenaire from "../Models/EventPartenaire";
import Request from "../../Core/services/Request";
import * as path from "path";
import partenaireUser from "../Models/PartenaireUserModel";


class PartenairesController {

    public static async getPartenaires() {
 
        try {
            

        let partenaires=await partenaireClass.findAll({"id_role":2});
        partenaires = JSON.parse(JSON.stringify(partenaires));

        return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
   } catch (error) {
            
        }
    }

    public static async getPartenaire(request: Request) {
 
        try {
            const { data } = request;

            const id = data.params;
     
          //  partenaireClass.setJoinTable(EventPartenaire,"id_Partenaire");
          eventsClass.setJoinTable([  {class:partenaireClass,fk:"id_user" },{class:EventPartenaire,fk:"id_event"}] );
        let partenaire=await partenaireClass.find({id:id});
            let listEvents=await eventsClass.findAll({"id_user":id});

            let follow=await partenaireUser.find([{"id_user":5,"op":"="},{"id_partenaire":id,"op":"="}]);

        partenaire = JSON.parse(JSON.stringify(partenaire));
        listEvents = JSON.parse(JSON.stringify(listEvents));
        follow = JSON.parse(JSON.stringify(follow));

        let isFollowed=follow.length >0 ? 1 :0;
        return Render.make('partenaire', { user: "toto", page: "detail",isFollowed:isFollowed,listEvents:listEvents, partenaire: partenaire[0] })
   } catch (error) {
            
        }
    }
    public static async getListPartenaires(request: Request) {
 
        try {
            const { data } = request;
            let search=data.query.s;

        let partenaires=await partenaireClass.findAll([{"nomMoral":"'"+"%"+search+"%"+"'","op":"LIKE"},{"id_role":"2","op":"="}]);
        partenaires = JSON.parse(JSON.stringify(partenaires));

        return JSON.stringify(partenaires)
       // return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
   } catch (error) {
            
        }
    }

}


export default PartenairesController;