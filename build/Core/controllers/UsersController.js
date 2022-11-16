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
prisma.$on('query', async (e) => {
    console.log(`${e.query} ${e.params} \n`);
});
class UserController {
    static async inscrire(request) {
        let { data } = request;
        data = JSON.parse(data);
        const dateJour = new Date();
        const nom = dateJour.getDate() + dateJour.getMonth() + dateJour.getFullYear() + "_" + dateJour.getHours() + dateJour.getMinutes() + dateJour.getSeconds();
        const userToken = JWToken_1.default.getUser();
        if (userToken != false) {
            await prisma.event_user.create({ data: { "id_event": data, "id_user": userToken.id } });
            qrcode.toFile('./public/image/' + nom + '.png', [{ data: userToken.nom + " " + userToken.prenom }], {
                scale: 4,
                width: 800
            }, async function () {
                await prisma.media.create({ data: { id_event: data, id_user: userToken.id, id_type: 2, "image": nom + ".png" } });
                console.log("cb");
            });
            return JSON.stringify({ "msg": "ok" });
        }
        else {
            return JSON.stringify({ "msg": "KO" });
        }
    }
    static async signup(request) {
        let { data } = request;
        data = JSON.parse(data);
        for (let index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }
        bcrypt_1.default.hash(data["password"], 1, async function (err, hash) {
            // Store hash in your password DB.
            const user = await prisma.users.create({
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
    }
    static async logout() {
        await JWToken_1.default.logout();
        return JSON.stringify({ msg: "OK" });
    }
    static async follow(request) {
        let { data } = request;
        const user = JWToken_1.default.getUser();
        if (user) {
            await prisma.partenaire_user.create({ data: { id_partenaire: parseInt(data), id_user: user.userId } });
            return JSON.stringify({ msg: "Ok" });
        }
        else {
            return JSON.stringify({ msg: "KO" });
        }
    }
    static async getUser() {
        const userToken = await JWToken_1.default.getUser();
        if (userToken) {
            return JSON.stringify(userToken);
        }
        else {
            return JSON.stringify({ msg: "ko" });
        }
    }
    static async getUserProfil() {
        const userToken = JWToken_1.default.getToken();
        if (typeof userToken !== "undefined") {
            let infoUser = JWToken_1.default.getUser();
            let id = infoUser.userId;
            const user = await prisma.users.findFirst({ where: { id } });
            // user = JSON.parse(JSON.stringify(user));
            return JSON.stringify(user);
        }
        else {
            return JSON.stringify({ "msg": "ko" });
        }
        //return Render.make('profil', { user:user[0],rootDir:rootDir })
    }
    static async updateProfil(request) {
        let { data } = request;
        const userToken = JWToken_1.default.getToken();
        if (userToken) {
            const base64Payload = userToken.split('.')[1];
            const payload = Buffer.from(base64Payload, 'base64');
            const infoUser = JSON.parse(payload.toString());
            await prisma.users.update({ data, where: { id: infoUser.id } });
            //partenaireModel.update({ id: infoUser.id }, data);
        }
    }
    static async getQRCODE(request) {
        let { data } = request;
        data = JSON.parse(data);
        // let userToken = JWTToken.getToken();
        // var base64Payload = userToken.split('.')[1];
        // var payload = Buffer.from(base64Payload, 'base64');
        // let infoUser = JSON.parse(payload.toString());
        const qrcode = await prisma.media.findFirst({
            where: { id_user: 1, "id_event": data.id, "id_type": 2 }
        });
        // qrcode = JSON.parse(JSON.stringify(qrcode));
        if (qrcode != null) {
            const fichier = qrcode.image;
            const rootDir = path.resolve('./');
            const code = fs.readFileSync("./public/image/" + fichier, 'base64');
            return JSON.stringify({ code });
        }
        else {
            return JSON.stringify({ "msg": "ko" });
        }
    }
    static async repondreQuestionnaire(request) {
        let { data } = request;
        data = JSON.parse(data);
        const userToken = JWToken_1.default.getToken();
        if (userToken) {
        }
        let questionsUser = await prisma.questions.findMany({
            where: { id_questionnaire: data.questionnaire },
            include: { users: { where: { id_user: 1 } } }
        });
        data.forEach(async (element) => {
            const quest = questionsUser[0].users.filter((q) => q.id_user == element.id_user);
            if (quest.length > 0) {
                await prisma.question_user.update({ data: { stars: element.stars }, where: { id: quest[0].id } });
            }
            else {
                await prisma.question_user.create({
                    data: {
                        id_user: 1,
                        id_question: element.id_question,
                        stars: element.stars
                    }
                });
            }
        });
        return JSON.stringify({ "msg": "ok" });
    }
    static becomePartner(request) {
        let { data } = request;
        data = JSON.parse(data);
        for (let index in data) {
            data[index] = UserController.escapeHtml(data[index]);
        }
        bcrypt_1.default.hash(data.password, 1, async function (err, hash) {
            // Store hash in your password DB.
            console.log(err);
            await prisma.users.create({
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