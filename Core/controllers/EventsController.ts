
import Request from "../../Core/services/Request";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import multiparty from "multiparty";


import JWTToken from "../services/JWToken";
import * as fs from "fs";
import * as dotenv from "dotenv";
import multer from "multer";
dotenv.config();
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'info'
        },
        {
            emit: 'stdout',
            level: 'warn'
        },
        {
            emit: 'event',
            level: 'query'
        }
    ],
});

prisma.$on('query', async (e) => {

    console.log(`${e.query} ${e.params} \n`)

});
class EventsController {

    public static async getEvents(request: Request) {

        try {
            const rootDir = path.resolve('./');
            const { data } = request;
            const queryLimit: any = {}
            queryLimit["limit"] = data.limit
            queryLimit["offset"] = data.offset


            let listeCurrentEvents: any = [];

            const currentEvents = await prisma.evenements.findMany(
                {
                    skip: data.offset != null ? data.offset : undefined,
                    take: data.limit,
                    where: {
                        dateDebut: { gt:new Date() },
                    },
                    include: {
                        lieu: true
                    }
                }
            );

            //  currentEvents = JSON.parse(JSON.stringify(currentEvents));


            let response = { currentEvents }
       
            return JSON.stringify(response);
            //  return Render.make('Events', { rootDir: rootDir, user: "toto", page: "detail", lastEvents: lastEvents, currentEvents: currentEvents })
        } catch (error) {
            console.log(error)
        }
    }

    public static async getCategories() {

        const categories = await prisma.categories.findMany({});
        // categories = JSON.parse(JSON.stringify(categories));

        return JSON.stringify(categories)
    }

    public static async getLieu() {

        const lieus = await prisma.lieu.findMany({});
        // categories = JSON.parse(JSON.stringify(categories));

        return JSON.stringify(lieus);
    }

    public static async getGallerie(request: Request) {
        let { data } = request;

        data = JSON.parse(data);

        let user = JWTToken.getUser()

        const queryLimit: any = {}
        queryLimit["limit"] = data.limit
        queryLimit["offset"] = data.offset
        const search: any = data.search;

        // MediaModel.setJoinTable([{ class: eventsClass, fk: "id_event" }]);
        let images = await prisma.media.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            include: { event: true, },
            where: {
                id_type: 1,
                user: null,
                event: { nom: { contains: search } }
            }
        });
        images = JSON.parse(JSON.stringify(images));

        // MediaModel.setJoinTable([{ class: eventsClass, fk: "id_event" }]);
        let total = await prisma.media.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            where: {
                id_type: 1,
                event: { nom: { contains: search } }
            }
        });

        total = JSON.parse(JSON.stringify(total)).length;

        return JSON.stringify({ gallerie: images, total, user });
    }

    public static async getAllEvents(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        const queryLimit: any = {}
        queryLimit["limit"] = data.limit
        queryLimit["offset"] = data.offset
        console.log("data all event:");
        console.log(data)
        let response = {};
        let total = 0;
        const today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();

        // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
        // eventsClass.setJoinTable([{ class: categoriesModel, fk: "id" }]);
        // let lastEvents = await eventsClass.findAll([{ "dateFin": today, "op": ">" }], queryLimit);

        const opt: any = {

            include: {

                events: {
                    include: {
                        lieu: true,
                    },
                    where: {
                        dateFin: { gt: new Date() },

                    },
                    skip: data.offset ? data.offset : 0,
                    take: data.limit,
                }
            }
        }
        let where = {}
        if (data.id_categorie) {
            where = { id: parseInt(data.id_categorie) }
            opt.where = where
        }
        let lastEvents: any = await prisma.categories.findMany(
            opt
        );

        lastEvents[0].events.forEach((element: any) => {

            element.affiche = fs.readFileSync("./public/image/" + element.affiche, 'base64');
        })

        total = await (await prisma.evenements.findMany({ where })).length;
        //  total = JSON.parse(JSON.stringify(total)).length;
        // lastEvents = JSON.parse(JSON.stringify(lastEvents));
        response = { listEvents: lastEvents, total };


        return JSON.stringify(response);

    }
    public static ajoutEvent() {
        let rootDir = path.resolve('./');
        // return Render.make('ajout_event', { rootDir: rootDir })
    }

    public static async addEvent(request: Request) {
        let { data } = request;
        // data= decodeURIComponent(data.replace(/\+/g, ' '))
        data = JSON.parse(data);


        //    form.parse(data, function(err, fields, files) {

        //     

        //   });
        let partenaires = data.partenaires;

        const cwd = process.cwd();


        // for (let index in data) {
        //     data[index] = EventsController.escapeHtml(data[index]);
        // }
        // await fs.writeFile(path.join(cwd,"client","public","01.txt"),data.affiche,()=>{});
        const newEvent = await prisma.evenements.create({
            data: {
                "nom": data.nom,
                "dateDebut": new Date(data.dateDebut),
                "nbPlace": parseInt(data.nbPlace),
                "prix": parseInt(data.prix),
                "id_lieu": data.id_lieu,
                "affiche": "5560.jpg",
                "id_categorie": data.id_categorie,
                "dateLimit": new Date(data.dateLimit),
                "isPublic": data.isPublic === 1 ? true : false,
                "description": data.description,
                "dateFin": new Date(data.dateFin)
            }
        });


        let follows = [];
        if (partenaires) {
            partenaires.forEach(async (element: any) => {
                //   let f = await prisma.users.findFirst({ where: {user: 5, "id_partenaire": element.id} });
                //   await prisma.users.findFirst({ 
                //     where: {id_: 5, "id_partenaire": element.id}

                // });
                //   //f = JSON.parse(JSON.stringify(f));
                //   if (f.length > 0) {
                //       //  follows.push(element.nomSoc)
                //   }
                await prisma.event_stand.create({
                    data: {
                        idEvent: {
                            connect: {
                                id: newEvent.id,
                            },
                        },
                        idUser: {
                            connect: { id: element.id }
                        }
                    }
                })
            });
        }

        return JSON.stringify({ msg: "ok" });

    }

    public static async updateEvent(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        let evt = data.event;

        console.log(data);
        await prisma.evenements.update({
            where: {
                id: data.id
            },
            data: evt
        })

    }

    public static async getEvent(request: Request) {

        try {
            const { data } = request;

            const id = data.params;

            const event: any = await prisma.evenements.findFirst({ where: { id: parseInt(id) }, include: { lieu: true } });

            //event = JSON.parse(JSON.stringify(event));
            console.log("event")
            const estInscrit = await EventsController.isInsrit(id);

            const estTermine = new Date(event.dateLimit).getTime() < new Date().getTime() ? 1 : 0;

            const stands = await prisma.stands.findMany({});
            // stands = JSON.parse(JSON.stringify(stands));

            let questionaire = await prisma.questionnaire.findFirst({
                where: { id_event: parseInt(id) },
                include: { questions: true },

            });

            const listePartenaireEvent = await prisma.event_stand.findMany({
                where: {
                    id_event: parseInt(id),

                },
                include: {
                    idUser: true,

                }
            })

            const partenaireByStands = EventsController.getPartenaireStand(id);

            const user = JWTToken.getUser();

            const response = { estInscrit: estInscrit, listePartenaireEvent, questionaire, estTermine, event, stands, partenaireByStands, user }
            return JSON.stringify(response);
        } catch (error) {
            console.log(error)
        }
    }

    private static async isInsrit(id: any) {
        const userToken: any = JWTToken.getUser();
        let myEvent: any = {};
        if (userToken) {

            myEvent = await prisma.event_user.findFirst({ where: { id_event: parseInt(id), id_user: userToken.userId } });
            // myEvent = JSON.parse(JSON.stringify(myEvent));
        }

        const estInscrit = myEvent ? 1 : 0;
        return estInscrit;
    }

    private static async getPartenaireStand(idEvent: any) {

        // let partenaireByStands = await EventStandModel.runQuery("SELECT u.nom,u.prenom,es.id_stand,es.activite " +
        //     " from users u " +
        //     "join event_stand es on es.id_partenaire = u.id " +
        //     "join evenements e on e.id = es.id_event " +
        //     "where e.id=" + idEvent);

        let partenaireByStands = await prisma.event_stand.findMany({
            where: { id_event: parseInt(idEvent) },
            include: { idUser: true }

        });
        // partenaireByStands = JSON.parse(JSON.stringify(partenaireByStands));
    }
    private static escapeHtml(text: any) {
        const map: any = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m: any) { return map[m]; });
    }

}

export default EventsController;