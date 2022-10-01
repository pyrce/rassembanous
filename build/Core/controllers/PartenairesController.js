"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const JWToken_1 = __importDefault(require("../services/JWToken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
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
    console.log(`${e.query} ${e.params} \n`);
});
class PartenairesController {
    static async getPartenaires() {
        try {
            let partenaires = await prisma.users.findMany({ where: { id_role: 2 } });
            //partenaires = JSON.parse(JSON.stringify(partenaires));
            return JSON.stringify(partenaires);
            //  return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getPartenaire(request) {
        try {
            const { data } = request;
            const id = data.params;
            //  partenaireClass.setJoinTable(EventPartenaire,"id_Partenaire");
            //  eventsClass.setJoinTable([{class:categoriesModel,fk:"id"}] )
            //  EventPartenaire.setJoinTable([  { class: eventsClass, fk: "id" } ]);
            let listEvents = await prisma.evenements.findMany({
                include: {
                    eventStand: {
                        where: {
                            id_user: parseInt(id)
                        },
                    },
                    media: { where: { id_type: 1 }, select: { image: true } }
                }
            });
            let partenaire = await prisma.users.findUnique({ where: { id: +id } });
            //partenaire = JSON.parse(JSON.stringify(partenaire));
            // listEvents = JSON.parse(JSON.stringify(listEvents));
            let follow = {};
            let isFollowed = false;
            let userToken = JWToken_1.default.getUser();
            console.log("usertoken");
            console.log(userToken);
            if (userToken != false) {
                let follow = await prisma.partenaire_user.findFirst({
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
    }
    static async getEvents(request) {
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
        let lastEvents = await prisma.evenements.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            where: {
                dateFin: { gt: new Date() }
            }
        });
        total = await prisma.evenements.findMany({
            where: {
                dateFin: { gt: new Date() }
            }
        });
        total = JSON.parse(JSON.stringify(total)).length;
        lastEvents = JSON.parse(JSON.stringify(lastEvents));
        response = { listEvents: lastEvents, total: total };
        return JSON.stringify(response);
    }
    static async getMyEvent(request) {
        try {
            let { data } = request;
            data = JSON.parse(data);
            const id = data.id;
            console.log("my events");
            // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
            let event = await prisma.evenements.findFirst({ where: { id: parseInt(id) } });
            //event = JSON.parse(JSON.stringify(event));
            let rootDir = path.resolve('./');
            let userToken = JWToken_1.default.getUser();
            let response = {};
            let myEvent = [];
            let categories = await prisma.categories.findMany();
            let estTermine = new Date(event.dateLimit).getTime() < new Date().getTime() ? 1 : 0;
            response = { estTermine: estTermine, event: event, categories: categories };
            return JSON.stringify(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getListPartenaires(request) {
        try {
            const { data } = request;
            let search = data.query.s;
            let partenaires = await prisma.users.findMany({
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
    }
}
exports.default = PartenairesController;
//# sourceMappingURL=PartenairesController.js.map