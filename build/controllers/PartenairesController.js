var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as path from "path";
import JWTToken from "../services/JWToken";
import { PrismaClient } from '@prisma/client';
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
prisma.$on('query', (e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${e.query} ${e.params} \n`);
}));
class PartenairesController {
    static getPartenaires() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let partenaires = yield prisma.users.findMany({ where: { id_role: 2 } });
                //partenaires = JSON.parse(JSON.stringify(partenaires));
                return JSON.stringify(partenaires);
                //  return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getPartenaire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = request;
                const id = data.params;
                //  partenaireClass.setJoinTable(EventPartenaire,"id_Partenaire");
                //  eventsClass.setJoinTable([{class:categoriesModel,fk:"id"}] )
                //  EventPartenaire.setJoinTable([  { class: eventsClass, fk: "id" } ]);
                let listEvents = yield prisma.evenements.findMany({
                    include: {
                        eventStand: {
                            where: {
                                id_user: parseInt(id)
                            },
                        },
                        media: { where: { id_type: 1 }, select: { image: true } }
                    }
                });
                let partenaire = yield prisma.users.findUnique({ where: { id: +id } });
                //partenaire = JSON.parse(JSON.stringify(partenaire));
                // listEvents = JSON.parse(JSON.stringify(listEvents));
                let follow = {};
                let isFollowed = false;
                let userToken = JWTToken.getUser();
                console.log("usertoken");
                console.log(userToken);
                if (userToken != false) {
                    let follow = yield prisma.partenaire_user.findFirst({
                        where: {
                            id_user: userToken.id, id_partenaire: +id
                        }
                    });
                    console.log(follow);
                    // follow = JSON.parse(JSON.stringify(follow));
                    isFollowed = follow ? true : false;
                }
                let response = { isFollowed: isFollowed, listEvents: listEvents, partenaire: partenaire };
                return JSON.stringify(response);
                //return Render.make('partenaire', { user: "toto", page: "detail",isFollowed:isFollowed,listEvents:listEvents, partenaire: partenaire[0] })
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getEvents(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let queryLimit = {};
            queryLimit["limit"] = data.limit;
            queryLimit["offset"] = data.offset;
            let response = {};
            let total = {};
            let today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();
            //eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
            /// eventsClass.setJoinTable([{ class: categoriesModel, fk: "id_categorie" }]);
            //  eventsClass.setJoinTable([{ class: eventPartenaire, fk: "id_partenaire" }]);
            //   let lastEvents = await eventsClass.findAll({"id_partenaire":data.id}, queryLimit);
            let lastEvents = yield prisma.evenements.findMany({
                skip: data.offset != null ? data.offset : undefined,
                take: data.limit,
                where: {
                    dateFin: { gt: new Date() }
                }
            });
            total = yield prisma.evenements.findMany({
                where: {
                    dateFin: { gt: new Date() }
                }
            });
            total = JSON.parse(JSON.stringify(total)).length;
            lastEvents = JSON.parse(JSON.stringify(lastEvents));
            response = { listEvents: lastEvents, total: total };
            return JSON.stringify(response);
        });
    }
    static getMyEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = request;
                data = JSON.parse(data);
                const id = data.id;
                console.log("my events");
                // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
                let event = yield prisma.evenements.findFirst({ where: { id: parseInt(id) } });
                //event = JSON.parse(JSON.stringify(event));
                let rootDir = path.resolve('./');
                let userToken = JWTToken.getUser();
                let response = {};
                let myEvent = [];
                let categories = yield prisma.categories.findMany();
                let estTermine = new Date(event.dateLimit).getTime() < new Date().getTime() ? 1 : 0;
                response = { estTermine: estTermine, event: event, categories: categories };
                return JSON.stringify(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getListPartenaires(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = request;
                let search = data.query.s;
                let partenaires = yield prisma.users.findMany({
                    skip: data.offset != null ? data.offset : undefined,
                    take: data.limit,
                    where: {
                        nom: { contains: search },
                        prenom: { contains: search }
                    }
                });
                partenaires = JSON.parse(JSON.stringify(partenaires));
                return JSON.stringify(partenaires);
                // return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
            }
            catch (error) {
            }
        });
    }
}
export default PartenairesController;
