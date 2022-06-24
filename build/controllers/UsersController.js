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
import * as qrcode from "qrcode";
import JWTToken from "../services/JWToken";
import * as fs from "fs";
import bcrypt from "bcrypt";
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
class UserController {
    static inscrire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let dateJour = new Date();
            let nom = dateJour.getDate() + dateJour.getMonth() + dateJour.getFullYear() + "_" + dateJour.getHours() + dateJour.getMinutes() + dateJour.getSeconds();
            let userToken = JWTToken.getUser();
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
            bcrypt.hash(data["password"], 1, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Store hash in your password DB.
                    let user = yield prisma.users.create({ data: {
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
            yield JWTToken.logout();
            return JSON.stringify({ msg: "OK" });
        });
    }
    static follow(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            let user = JWTToken.getUser();
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
            let userToken = yield JWTToken.getUser();
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
            let userToken = JWTToken.getToken();
            if (typeof userToken != "undefined") {
                let infoUser = JWTToken.getUser();
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
            let userToken = JWTToken.getToken();
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
            let userToken = JWTToken.getToken();
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
        bcrypt.hash(data.password, 1, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                // Store hash in your password DB.
                console.log(err);
                yield prisma.users.create({ data: {
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
export default UserController;
