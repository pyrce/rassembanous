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
var qrcode = require("qrcode");
var JWToken_1 = require("../services/JWToken");
var fs = require("fs");
var bcrypt_1 = require("bcrypt");
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
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.inscrire = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, dateJour, nom, userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        dateJour = new Date();
                        nom = dateJour.getDate() + dateJour.getMonth() + dateJour.getFullYear() + "_" + dateJour.getHours() + dateJour.getMinutes() + dateJour.getSeconds();
                        userToken = JWToken_1["default"].getUser();
                        console.log("user connected :");
                        console.log(userToken);
                        if (!(userToken != false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, prisma.event_user.create({ data: { "id_event": data, "id_user": userToken.id } })];
                    case 1:
                        _a.sent();
                        qrcode.toFile('./public/image/' + nom + '.png', [{ data: userToken.nom + " " + userToken.prenom, mode: 'byte' }], {
                            scale: 4,
                            width: 800
                        }, function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.media.create({ data: { id_event: data, id_user: userToken.id, id_type: 2, "image": nom + ".png" } })];
                                        case 1:
                                            _a.sent();
                                            console.log("cb");
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/, JSON.stringify({ "msg": "ok" })];
                    case 2: return [2 /*return*/, JSON.stringify({ "msg": "KO" })];
                }
            });
        });
    };
    UserController.signup = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, index;
            return __generator(this, function (_a) {
                data = request.data;
                data = JSON.parse(data);
                for (index in data) {
                    data[index] = UserController.escapeHtml(data[index]);
                }
                bcrypt_1["default"].hash(data["password"], 1, function (err, hash) {
                    return __awaiter(this, void 0, void 0, function () {
                        var user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.users.create({ data: {
                                            "nom": data.nom,
                                            "prenom": data.prenom,
                                            "login": data.login,
                                            "password": hash,
                                            "id_role": 2,
                                            "email": data.email,
                                            "adresse": data.adresse
                                        }
                                    })];
                                case 1:
                                    user = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                console.log("inserted");
                return [2 /*return*/];
            });
        });
    };
    UserController.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JWToken_1["default"].logout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, JSON.stringify({ msg: "OK" })];
                }
            });
        });
    };
    UserController.follow = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        user = JWToken_1["default"].getUser();
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, prisma.partenaire_user.create({ data: { id_partenaire: parseInt(data), id_user: user.userId } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, JSON.stringify({ msg: "Ok" })];
                    case 2: return [2 /*return*/, JSON.stringify({ msg: "KO" })];
                }
            });
        });
    };
    UserController.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, JWToken_1["default"].getUser()];
                    case 1:
                        userToken = _a.sent();
                        console.log("userToken ! :");
                        console.log(userToken);
                        if (userToken) {
                            return [2 /*return*/, JSON.stringify(userToken)];
                        }
                        else {
                            return [2 /*return*/, JSON.stringify({ msg: "ko" })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.getUserProfil = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userToken, infoUser, id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userToken = JWToken_1["default"].getToken();
                        if (!(typeof userToken != "undefined")) return [3 /*break*/, 2];
                        infoUser = JWToken_1["default"].getUser();
                        id = infoUser.userId;
                        return [4 /*yield*/, prisma.users.findFirst({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        // user = JSON.parse(JSON.stringify(user));
                        return [2 /*return*/, JSON.stringify(user)];
                    case 2:
                        console.log("ko");
                        return [2 /*return*/, JSON.stringify({ "msg": "ko" })];
                }
            });
        });
    };
    UserController.updateProfil = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, userToken, base64Payload, payload, infoUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        userToken = JWToken_1["default"].getToken();
                        if (!userToken) return [3 /*break*/, 2];
                        base64Payload = userToken.split('.')[1];
                        payload = Buffer.from(base64Payload, 'base64');
                        infoUser = JSON.parse(payload.toString());
                        return [4 /*yield*/, prisma.users.update({ data: data, where: { id: infoUser.id } })
                            //partenaireModel.update({ id: infoUser.id }, data);
                        ];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getQRCODE = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, qrcode, fichier, rootDir, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        return [4 /*yield*/, prisma.media.findFirst({
                                where: { id_user: 1, "id_event": data.id, "id_type": 2 }
                            })];
                    case 1:
                        qrcode = _a.sent();
                        //qrcode = JSON.parse(JSON.stringify(qrcode));
                        if (qrcode != null) {
                            fichier = qrcode.image;
                            rootDir = path.resolve('./');
                            code = fs.readFileSync("./public/image/" + fichier, 'base64');
                            return [2 /*return*/, JSON.stringify({ code: code })];
                        }
                        else {
                            return [2 /*return*/, JSON.stringify({ "msg": "ko" })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.repondreQuestionnaire = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, userToken, questionsUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.data;
                        data = JSON.parse(data);
                        userToken = JWToken_1["default"].getToken();
                        if (userToken) {
                        }
                        return [4 /*yield*/, prisma.questions.findMany({
                                where: { id_questionnaire: data.questionnaire },
                                include: { users: { where: { id_user: 1 } } }
                            })];
                    case 1:
                        questionsUser = _a.sent();
                        data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var quest;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        quest = questionsUser[0].users.filter(function (q) { return q.id_user == element.id_user; });
                                        console.log("quest");
                                        console.log(quest);
                                        if (!(quest.length > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, prisma.question_user.update({ data: { stars: element.stars }, where: { id: quest[0].id } })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, prisma.question_user.create({
                                            data: {
                                                id_user: 1,
                                                id_question: element.id_question,
                                                stars: element.stars
                                            }
                                        })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, JSON.stringify({ "msg": "ok" })];
                }
            });
        });
    };
    UserController.becomePartner = function (request) {
        var data = request.data;
        data = JSON.parse(data);
        for (var index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }
        bcrypt_1["default"].hash(data.password, 1, function (err, hash) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Store hash in your password DB.
                            console.log(err);
                            return [4 /*yield*/, prisma.users.create({ data: {
                                        "nom": data.nom,
                                        "prenom": data.prenom,
                                        "login": data.login,
                                        "password": hash,
                                        "id_role": 3,
                                        "token": "",
                                        "email": data.email,
                                        "adresse": data.adresse
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        console.log("inserted");
        return JSON.stringify({ "msg": "ok" });
    };
    UserController.escapeHtml = function (text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    };
    return UserController;
}());
exports["default"] = UserController;
