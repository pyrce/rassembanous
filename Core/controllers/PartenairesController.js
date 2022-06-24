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
var PartenairesController = /** @class */ (function () {
    function PartenairesController() {
    }
    PartenairesController.getPartenaires = function () {
        return __awaiter(this, void 0, void 0, function () {
            var partenaires, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.users.findMany({ where: { id_role: 2 } })];
                    case 1:
                        partenaires = _a.sent();
                        //partenaires = JSON.parse(JSON.stringify(partenaires));
                        return [2 /*return*/, JSON.stringify(partenaires)
                            //  return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
                        ];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PartenairesController.getPartenaire = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, id, listEvents, partenaire, follow, isFollowed, userToken, follow_1, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        data = request.data;
                        id = data.params;
                        return [4 /*yield*/, prisma.evenements.findMany({
                                include: {
                                    eventStand: {
                                        where: {
                                            id_user: parseInt(id)
                                        }
                                    },
                                    media: { where: { id_type: 1 }, select: { image: true } }
                                }
                            })];
                    case 1:
                        listEvents = _a.sent();
                        return [4 /*yield*/, prisma.users.findUnique({ where: { id: +id } })
                            //partenaire = JSON.parse(JSON.stringify(partenaire));
                            // listEvents = JSON.parse(JSON.stringify(listEvents));
                        ];
                    case 2:
                        partenaire = _a.sent();
                        follow = {};
                        isFollowed = false;
                        userToken = JWToken_1["default"].getUser();
                        console.log("usertoken");
                        console.log(userToken);
                        if (!(userToken != false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.partenaire_user.findFirst({
                                where: {
                                    id_user: userToken.id, id_partenaire: +id
                                }
                            })];
                    case 3:
                        follow_1 = _a.sent();
                        console.log(follow_1);
                        // follow = JSON.parse(JSON.stringify(follow));
                        isFollowed = follow_1 ? true : false;
                        _a.label = 4;
                    case 4:
                        response = { isFollowed: isFollowed, listEvents: listEvents, partenaire: partenaire };
                        return [2 /*return*/, JSON.stringify(response)];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PartenairesController.getEvents = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, queryLimit, response, total, today, lastEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        queryLimit = {};
                        queryLimit["limit"] = data.limit;
                        queryLimit["offset"] = data.offset;
                        response = {};
                        total = {};
                        today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();
                        return [4 /*yield*/, prisma.evenements.findMany({
                                skip: data.offset != null ? data.offset : undefined,
                                take: data.limit,
                                where: {
                                    dateFin: { gt: new Date() }
                                }
                            })];
                    case 1:
                        lastEvents = _a.sent();
                        return [4 /*yield*/, prisma.evenements.findMany({
                                where: {
                                    dateFin: { gt: new Date() }
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        total = JSON.parse(JSON.stringify(total)).length;
                        lastEvents = JSON.parse(JSON.stringify(lastEvents));
                        response = { listEvents: lastEvents, total: total };
                        return [2 /*return*/, JSON.stringify(response)];
                }
            });
        });
    };
    PartenairesController.getMyEvent = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, id, event_1, rootDir, userToken, response, myEvent, categories, estTermine, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = request.data;
                        data = JSON.parse(data);
                        id = data.id;
                        console.log("my events");
                        return [4 /*yield*/, prisma.evenements.findFirst({ where: { id: parseInt(id) } })
                            //event = JSON.parse(JSON.stringify(event));
                        ];
                    case 1:
                        event_1 = _a.sent();
                        rootDir = path.resolve('./');
                        userToken = JWToken_1["default"].getUser();
                        response = {};
                        myEvent = [];
                        return [4 /*yield*/, prisma.categories.findMany()];
                    case 2:
                        categories = _a.sent();
                        estTermine = new Date(event_1.dateLimit).getTime() < new Date().getTime() ? 1 : 0;
                        response = { estTermine: estTermine, event: event_1, categories: categories };
                        return [2 /*return*/, JSON.stringify(response)];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PartenairesController.getListPartenaires = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, search, partenaires, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = request.data;
                        search = data.query.s;
                        return [4 /*yield*/, prisma.users.findMany({
                                skip: data.offset != null ? data.offset : undefined,
                                take: data.limit,
                                where: {
                                    nom: { contains: search },
                                    prenom: { contains: search }
                                }
                            })];
                    case 1:
                        partenaires = _a.sent();
                        partenaires = JSON.parse(JSON.stringify(partenaires));
                        return [2 /*return*/, JSON.stringify(partenaires)
                            // return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
                        ];
                    case 2:
                        error_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PartenairesController;
}());
exports["default"] = PartenairesController;
