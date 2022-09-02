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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const JWToken_1 = __importDefault(require("../services/JWToken"));
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
prisma.$on('query', (e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${e.query} ${e.params} \n`);
}));
class EventsController {
    static getEvents(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rootDir = path.resolve('./');
                const { data } = request;
                let queryLimit = {};
                queryLimit["limit"] = data.limit;
                queryLimit["offset"] = data.offset;
                var listeCurrentEvents = [];
                let currentEvents = yield prisma.evenements.findMany({
                    skip: data.offset != null ? data.offset : undefined,
                    take: data.limit,
                    where: {
                        dateFin: { gt: new Date() },
                    },
                    include: {
                        lieu: true
                    }
                });
                //  currentEvents = JSON.parse(JSON.stringify(currentEvents));
                let response = { currentEvents: currentEvents };
                return JSON.stringify(response);
                //  return Render.make('Events', { rootDir: rootDir, user: "toto", page: "detail", lastEvents: lastEvents, currentEvents: currentEvents })
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = yield prisma.categories.findMany({});
            // categories = JSON.parse(JSON.stringify(categories));
            return JSON.stringify(categories);
        });
    }
    static getLieu() {
        return __awaiter(this, void 0, void 0, function* () {
            let lieus = yield prisma.lieu.findMany({});
            // categories = JSON.parse(JSON.stringify(categories));
            return JSON.stringify(lieus);
        });
    }
    static getGallerie(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let user = JWToken_1.default.getUser();
            let queryLimit = {};
            queryLimit["limit"] = data.limit;
            queryLimit["offset"] = data.offset;
            let search = data.search;
            // MediaModel.setJoinTable([{ class: eventsClass, fk: "id_event" }]);
            let images = yield prisma.media.findMany({
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
            let total = yield prisma.media.findMany({
                skip: data.offset != null ? data.offset : undefined,
                take: data.limit,
                where: {
                    id_type: 1,
                    event: { nom: { contains: search } }
                }
            });
            total = JSON.parse(JSON.stringify(total)).length;
            return JSON.stringify({ gallerie: images, total: total, user: user });
        });
    }
    static getAllEvents(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let queryLimit = {};
            queryLimit["limit"] = data.limit;
            queryLimit["offset"] = data.offset;
            console.log("data all event:");
            console.log(data);
            let response = {};
            let total = 0;
            let today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();
            // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
            // eventsClass.setJoinTable([{ class: categoriesModel, fk: "id" }]);
            // let lastEvents = await eventsClass.findAll([{ "dateFin": today, "op": ">" }], queryLimit);
            let opt = {
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
            };
            let where = {};
            if (data.id_categorie) {
                where = { id: parseInt(data.id_categorie) };
                opt.where = where;
            }
            let lastEvents = yield prisma.categories.findMany(opt);
            lastEvents[0].events.forEach((element) => {
                element.affiche = fs.readFileSync("./public/image/" + element.affiche, 'base64');
            });
            total = yield (yield prisma.evenements.findMany({ where })).length;
            //  total = JSON.parse(JSON.stringify(total)).length;
            // lastEvents = JSON.parse(JSON.stringify(lastEvents));
            response = { listEvents: lastEvents, total: total };
            return JSON.stringify(response);
        });
    }
    static ajoutEvent() {
        let rootDir = path.resolve('./');
        // return Render.make('ajout_event', { rootDir: rootDir })
    }
    static addEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
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
            //await fs.writeFile(path.join(cwd,"client","public","01.txt"),data.affiche,()=>{});
            let newEvent = yield prisma.evenements.create({
                data: {
                    "nom": data.nom,
                    "dateDebut": new Date(data.dateDebut),
                    "nbPlace": parseInt(data.nbPlace),
                    "prix": parseInt(data.prix),
                    "id_lieu": data.id_lieu,
                    "affiche": "5560.jpg",
                    "id_categorie": data.id_categorie,
                    "dateLimit": new Date(data.dateLimit),
                    "isPublic": data.isPublic == 1 ? true : false,
                    "description": data.description,
                    "dateFin": new Date(data.dateFin)
                }
            });
            let follows = [];
            if (partenaires) {
                partenaires.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    //   let f = await prisma.users.findFirst({ where: {user: 5, "id_partenaire": element.id} });
                    //   await prisma.users.findFirst({ 
                    //     where: {id_: 5, "id_partenaire": element.id}
                    // });
                    //   //f = JSON.parse(JSON.stringify(f));
                    //   if (f.length > 0) {
                    //       //  follows.push(element.nomSoc)
                    //   }
                    yield prisma.event_stand.create({
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
                    });
                }));
            }
            return JSON.stringify({ msg: "ok" });
        });
    }
    static updateEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let evt = data.event;
            console.log(data);
            yield prisma.evenements.update({
                where: {
                    id: data.id
                },
                data: evt
            });
        });
    }
    static getEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = request;
                const id = data.params;
                let event = yield prisma.evenements.findFirst({ where: { id: parseInt(id) }, include: { lieu: true } });
                //event = JSON.parse(JSON.stringify(event));
                console.log("event");
                let estInscrit = yield EventsController.isInsrit(id);
                let estTermine = new Date(event.dateLimit).getTime() < new Date().getTime() ? 1 : 0;
                let stands = yield prisma.stands.findMany({});
                // stands = JSON.parse(JSON.stringify(stands));
                let questionaire = yield prisma.questionnaire.findFirst({
                    where: { id_event: parseInt(id) },
                    include: { questions: true },
                });
                let listePartenaireEvent = yield prisma.event_stand.findMany({
                    where: {
                        id_event: parseInt(id),
                    },
                    include: {
                        idUser: true,
                    }
                });
                let partenaireByStands = EventsController.getPartenaireStand(id);
                let user = JWToken_1.default.getUser();
                let response = { estInscrit: estInscrit, listePartenaireEvent: listePartenaireEvent, questionaire: questionaire, estTermine: estTermine, event: event, stands: stands, partenaireByStands: partenaireByStands, user: user };
                return JSON.stringify(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static isInsrit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userToken = JWToken_1.default.getUser();
            let myEvent = {};
            if (userToken) {
                myEvent = yield prisma.event_user.findFirst({ where: { id_event: parseInt(id), id_user: userToken.userId } });
                //myEvent = JSON.parse(JSON.stringify(myEvent));
            }
            console.log("myEvent");
            console.log(myEvent);
            let estInscrit = myEvent ? 1 : 0;
            return estInscrit;
        });
    }
    static getPartenaireStand(idEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            // let partenaireByStands = await EventStandModel.runQuery("SELECT u.nom,u.prenom,es.id_stand,es.activite " +
            //     " from users u " +
            //     "join event_stand es on es.id_partenaire = u.id " +
            //     "join evenements e on e.id = es.id_event " +
            //     "where e.id=" + idEvent);
            let partenaireByStands = yield prisma.event_stand.findMany({
                where: { id_event: parseInt(idEvent) },
                include: { idUser: true }
            });
            // partenaireByStands = JSON.parse(JSON.stringify(partenaireByStands));
        });
    }
    static escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }
}
exports.default = EventsController;
//# sourceMappingURL=EventsController.js.map