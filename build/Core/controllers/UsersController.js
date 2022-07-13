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
const qrcode = __importStar(require("qrcode"));
const JWToken_1 = __importDefault(require("../services/JWToken"));
const fs = __importStar(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
class UserController {
    static inscrire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let dateJour = new Date();
            let nom = dateJour.getDate() + dateJour.getMonth() + dateJour.getFullYear() + "_" + dateJour.getHours() + dateJour.getMinutes() + dateJour.getSeconds();
            let userToken = JWToken_1.default.getUser();
            console.log("user connected :");
            console.log(userToken);
            if (userToken != false) {
                yield prisma.event_user.create({ data: { "id_event": data, "id_user": userToken.id } });
                qrcode.toFile('./public/image/' + nom + '.png', [{ data: userToken.nom + " " + userToken.prenom, mode: 'byte' }], {
                    scale: 4,
                    width: 800
                }, function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield prisma.media.create({ data: { id_event: data, id_user: userToken.id, id_type: 2, "image": nom + ".png" } });
                        console.log("cb");
                    });
                });
                return JSON.stringify({ "msg": "ok" });
            }
            else {
                return JSON.stringify({ "msg": "KO" });
            }
        });
    }
    static signup(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            for (let index in data) {
                data[index] = UserController.escapeHtml(data[index]);
            }
            bcrypt_1.default.hash(data["password"], 1, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Store hash in your password DB.
                    let user = yield prisma.users.create({
                        data: {
                            "nom": data.nom,
                            "prenom": data.prenom,
                            "login": data.login,
                            "password": hash,
                            "id_role": 2,
                            "email": data.email,
                            "adresse": data.adresse
                        }
                    });
                });
            });
            console.log("inserted");
        });
    }
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield JWToken_1.default.logout();
            return JSON.stringify({ msg: "OK" });
        });
    }
    static follow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            let user = JWToken_1.default.getUser();
            if (user) {
                yield prisma.partenaire_user.create({ data: { id_partenaire: parseInt(data), id_user: user.userId } });
                return JSON.stringify({ msg: "Ok" });
            }
            else {
                return JSON.stringify({ msg: "KO" });
            }
        });
    }
    static getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let userToken = yield JWToken_1.default.getUser();
            console.log("userToken ! :");
            console.log(userToken);
            if (userToken) {
                return JSON.stringify(userToken);
            }
            else {
                return JSON.stringify({ msg: "ko" });
            }
        });
    }
    static getUserProfil() {
        return __awaiter(this, void 0, void 0, function* () {
            let userToken = JWToken_1.default.getToken();
            if (typeof userToken != "undefined") {
                let infoUser = JWToken_1.default.getUser();
                let id = infoUser.userId;
                let user = yield prisma.users.findFirst({ where: { id: id } });
                // user = JSON.parse(JSON.stringify(user));
                return JSON.stringify(user);
            }
            else {
                console.log("ko");
                return JSON.stringify({ "msg": "ko" });
            }
            //return Render.make('profil', { user:user[0],rootDir:rootDir })
        });
    }
    static updateProfil(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            let userToken = JWToken_1.default.getToken();
            if (userToken) {
                var base64Payload = userToken.split('.')[1];
                var payload = Buffer.from(base64Payload, 'base64');
                let infoUser = JSON.parse(payload.toString());
                yield prisma.users.update({ data: data, where: { id: infoUser.id } });
                //partenaireModel.update({ id: infoUser.id }, data);
            }
        });
    }
    static getQRCODE(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            // let userToken = JWTToken.getToken();
            // var base64Payload = userToken.split('.')[1];
            // var payload = Buffer.from(base64Payload, 'base64');
            // let infoUser = JSON.parse(payload.toString());
            let qrcode = yield prisma.media.findFirst({
                where: { id_user: 1, "id_event": data.id, "id_type": 2 }
            });
            //qrcode = JSON.parse(JSON.stringify(qrcode));
            if (qrcode != null) {
                let fichier = qrcode.image;
                let rootDir = path.resolve('./');
                var code = fs.readFileSync("./public/image/" + fichier, 'base64');
                return JSON.stringify({ code: code });
            }
            else {
                return JSON.stringify({ "msg": "ko" });
            }
        });
    }
    static repondreQuestionnaire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let userToken = JWToken_1.default.getToken();
            if (userToken) {
            }
            let questionsUser = yield prisma.questions.findMany({
                where: { id_questionnaire: data.questionnaire },
                include: { users: { where: { id_user: 1 } } }
            });
            data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let quest = questionsUser[0].users.filter((q) => q.id_user == element.id_user);
                console.log("quest");
                console.log(quest);
                if (quest.length > 0) {
                    yield prisma.question_user.update({ data: { stars: element.stars }, where: { id: quest[0].id } });
                }
                else {
                    yield prisma.question_user.create({
                        data: {
                            id_user: 1,
                            id_question: element.id_question,
                            stars: element.stars
                        }
                    });
                }
            }));
            return JSON.stringify({ "msg": "ok" });
        });
    }
    static becomePartner(request) {
        let { data } = request;
        data = JSON.parse(data);
        for (let index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }
        bcrypt_1.default.hash(data.password, 1, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                // Store hash in your password DB.
                console.log(err);
                yield prisma.users.create({
                    data: {
                        "nom": data.nom,
                        "prenom": data.prenom,
                        "login": data.login,
                        "password": hash,
                        "id_role": 3,
                        "token": "",
                        "email": data.email,
                        "adresse": data.adresse,
                    }
                });
            });
        });
        console.log("inserted");
        return JSON.stringify({ "msg": "ok" });
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
exports.default = UserController;
//# sourceMappingURL=UsersController.js.map