"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path = require("path");
var JWToken_1 = require("../services/JWToken");
var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config();
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient({
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
    ]
});
prisma.$on('query', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("".concat(e.query, " ").concat(e.params, " \n"));
        return [2 /*return*/];
    });
}); });
var EventsController = /** @class */ (function () {
    function EventsController() {
    }
    EventsController.getEvents = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var rootDir, data, queryLimit, listeCurrentEvents, currentEvents, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        rootDir = path.resolve('./');
                        data = request.data;
                        queryLimit = {};
                        queryLimit["limit"] = data.limit;
                        queryLimit["offset"] = data.offset;
                        listeCurrentEvents = [];
                        // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
                        //let today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();
                        //   let currentEvents = await eventsClass.findAll([{ "dateLimit": today, "op": ">" }], queryLimit);
                        /* let currentEvents = await eventsClass.findAll({   offset: data.limit,
                             limit: data.offset, where:{dateFin:{gt:today} }});*/
                        console.log("data :");
                        console.log(data);
                        return [4 /*yield*/, prisma.evenements.findMany()];
                    case 1:
                        currentEvents = _a.sent();
                        response = { currentEvents: currentEvents };
                        return [2 /*return*/, JSON.stringify(response)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EventsController.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.categories.findMany({})];
                    case 1:
                        categories = _a.sent();
                        // categories = JSON.parse(JSON.stringify(categories));
                        return [2 /*return*/, JSON.stringify(categories)];
                }
            });
        });
    };
    EventsController.getLieu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lieus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.lieu.findMany({})];
                    case 1:
                        lieus = _a.sent();
                        // categories = JSON.parse(JSON.stringify(categories));
                        return [2 /*return*/, JSON.stringify(lieus)];
                }
            });
        });
    };
    EventsController.getGallerie = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user, queryLimit, search, images, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        user = JWToken_1["default"].getUser();
                        queryLimit = {};
                        queryLimit["limit"] = data.limit;
                        queryLimit["offset"] = data.offset;
                        search = data.search;
                        return [4 /*yield*/, prisma.media.findMany({
                                skip: data.offset != null ? data.offset : undefined,
                                take: data.limit,
                                include: { event: true },
                                where: {
                                    id_type: 1,
                                    user: null,
                                    event: { nom: { contains: search } }
                                }
                            })];
                    case 1:
                        images = _a.sent();
                        images = JSON.parse(JSON.stringify(images));
                        return [4 /*yield*/, prisma.media.findMany({
                                skip: data.offset != null ? data.offset : undefined,
                                take: data.limit,
                                where: {
                                    id_type: 1,
                                    event: { nom: { contains: search } }
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        total = JSON.parse(JSON.stringify(total)).length;
                        return [2 /*return*/, JSON.stringify({ gallerie: images, total: total, user: user })];
                }
            });
        });
    };
    EventsController.getAllEvents = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, queryLimit, response, total, today, opt, where, lastEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        queryLimit = {};
                        queryLimit["limit"] = data.limit;
                        queryLimit["offset"] = data.offset;
                        console.log("data all event:");
                        console.log(data);
                        response = {};
                        total = 0;
                        today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();
                        opt = {
                            include: {
                                events: {
                                    include: {
                                        lieu: true
                                    },
                                    where: {
                                        dateFin: { gt: new Date() }
                                    },
                                    skip: data.offset ? data.offset : 0,
                                    take: data.limit
                                }
                            }
                        };
                        where = {};
                        if (data.id_categorie) {
                            where = { id: parseInt(data.id_categorie) };
                            opt.where = where;
                        }
                        return [4 /*yield*/, prisma.categories.findMany(opt)];
                    case 1:
                        lastEvents = _a.sent();
                        lastEvents[0].events.forEach(function (element) {
                            element.affiche = fs.readFileSync("./public/image/" + element.affiche, 'base64');
                        });
                        return [4 /*yield*/, prisma.evenements.findMany({ where: where })];
                    case 2: return [4 /*yield*/, (_a.sent()).length];
                    case 3:
                        total = _a.sent();
                        //  total = JSON.parse(JSON.stringify(total)).length;
                        // lastEvents = JSON.parse(JSON.stringify(lastEvents));
                        response = { listEvents: lastEvents, total: total };
                        return [2 /*return*/, JSON.stringify(response)];
                }
            });
        });
    };
    EventsController.ajoutEvent = function () {
        var rootDir = path.resolve('./');
        // return Render.make('ajout_event', { rootDir: rootDir })
    };
    EventsController.addEvent = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, partenaires, cwd, newEvent, follows;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        // data= decodeURIComponent(data.replace(/\+/g, ' '))
                        data = JSON.parse(data);
                        partenaires = data.partenaires;
                        cwd = process.cwd();
                        return [4 /*yield*/, prisma.evenements.create({
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
                            })];
                    case 1:
                        newEvent = _a.sent();
                        follows = [];
                        if (partenaires) {
                            partenaires.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        //   let f = await prisma.users.findFirst({ where: {user: 5, "id_partenaire": element.id} });
                                        //   await prisma.users.findFirst({ 
                                        //     where: {id_: 5, "id_partenaire": element.id}
                                        // });
                                        //   //f = JSON.parse(JSON.stringify(f));
                                        //   if (f.length > 0) {
                                        //       //  follows.push(element.nomSoc)
                                        //   }
                                        return [4 /*yield*/, prisma.event_stand.create({
                                                data: {
                                                    idEvent: {
                                                        connect: {
                                                            id: newEvent.id
                                                        }
                                                    },
                                                    idUser: {
                                                        connect: { id: element.id }
                                                    }
                                                }
                                            })];
                                        case 1:
                                            //   let f = await prisma.users.findFirst({ where: {user: 5, "id_partenaire": element.id} });
                                            //   await prisma.users.findFirst({ 
                                            //     where: {id_: 5, "id_partenaire": element.id}
                                            // });
                                            //   //f = JSON.parse(JSON.stringify(f));
                                            //   if (f.length > 0) {
                                            //       //  follows.push(element.nomSoc)
                                            //   }
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/, JSON.stringify({ msg: "ok" })];
                }
            });
        });
    };
    EventsController.updateEvent = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, evt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        evt = data.event;
                        console.log(data);
                        return [4 /*yield*/, prisma.evenements.update({
                                where: {
                                    id: data.id
                                },
                                data: evt
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsController.getEvent = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, id, event_1, estInscrit, estTermine, stands, questionaire, listePartenaireEvent, partenaireByStands, user, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        data = request.data;
                        id = data.params;
                        return [4 /*yield*/, prisma.evenements.findFirst({ where: { id: parseInt(id) }, include: { lieu: true } })];
                    case 1:
                        event_1 = _a.sent();
                        //event = JSON.parse(JSON.stringify(event));
                        console.log("event");
                        return [4 /*yield*/, EventsController.isInsrit(id)];
                    case 2:
                        estInscrit = _a.sent();
                        estTermine = new Date(event_1.dateLimit).getTime() < new Date().getTime() ? 1 : 0;
                        return [4 /*yield*/, prisma.stands.findMany({})];
                    case 3:
                        stands = _a.sent();
                        return [4 /*yield*/, prisma.questionnaire.findFirst({
                                where: { id_event: parseInt(id) },
                                include: { questions: true }
                            })];
                    case 4:
                        questionaire = _a.sent();
                        return [4 /*yield*/, prisma.event_stand.findMany({
                                where: {
                                    id_event: parseInt(id)
                                },
                                include: {
                                    idUser: true
                                }
                            })];
                    case 5:
                        listePartenaireEvent = _a.sent();
                        partenaireByStands = EventsController.getPartenaireStand(id);
                        user = JWToken_1["default"].getUser();
                        response = { estInscrit: estInscrit, listePartenaireEvent: listePartenaireEvent, questionaire: questionaire, estTermine: estTermine, event: event_1, stands: stands, partenaireByStands: partenaireByStands, user: user };
                        return [2 /*return*/, JSON.stringify(response)];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EventsController.isInsrit = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userToken, myEvent, estInscrit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userToken = JWToken_1["default"].getUser();
                        myEvent = {};
                        if (!userToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, prisma.event_user.findFirst({ where: { id_event: parseInt(id), id_user: userToken.userId } })];
                    case 1:
                        myEvent = _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("myEvent");
                        console.log(myEvent);
                        estInscrit = myEvent ? 1 : 0;
                        return [2 /*return*/, estInscrit];
                }
            });
        });
    };
    EventsController.getPartenaireStand = function (idEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var partenaireByStands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.event_stand.findMany({
                            where: { id_event: parseInt(idEvent) },
                            include: { idUser: true }
                        })];
                    case 1:
                        partenaireByStands = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsController.escapeHtml = function (text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    };
    return EventsController;
}());
exports["default"] = EventsController;
