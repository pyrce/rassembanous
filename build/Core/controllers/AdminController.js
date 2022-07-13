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
Object.defineProperty(exports, "__esModule", { value: true });
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
class HomeController {
    static getUsers(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let search = data.search != "undefined" ? data.search : "";
            // UsersModel.setJoinTable([{class:RolesModel,fk:"id"}]);
            let allUsers = yield prisma.users.findMany({
                skip: data.offset != null ? data.offset : undefined,
                take: data.limit,
                where: { OR: [{ nom: { contains: search }, prenom: { contains: search } }] }
            });
            allUsers = JSON.parse(JSON.stringify(allUsers));
            let total = yield prisma.users.findMany({});
            total = JSON.parse(JSON.stringify(total)).length;
            let roles = yield prisma.roles.findMany({});
            return JSON.stringify({ alluser: allUsers, roles: roles, total: total });
        });
    }
    static getCategories(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            //data = JSON.parse(data);
            let categories = yield prisma.categories.findMany({
                skip: data.offset != null ? data.offset : undefined,
                take: data.limit
            });
            return JSON.stringify({ categories: categories });
        });
    }
    static addCategorie(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            if (data.id) {
                yield prisma.categories.update({ data: { categorie: data.categorie, icon: data.icon }, where: { id: data.id } });
            }
            else {
                let categories = yield prisma.categories.create({ data: data });
            }
            return JSON.stringify({ "msg": "ok" });
        });
    }
    static addUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let user = data.data;
            try {
                yield prisma.users.create({ data: user });
                return JSON.stringify({ "msg": "ok" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let id = data.id;
            try {
                yield prisma.users.delete({ where: { id: id } });
                return JSON.stringify({ "msg": "ok" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteCat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let id = data.id;
            try {
                yield prisma.categories.delete({ where: { id: id } });
                return JSON.stringify({ "msg": "ok" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteImage(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            //  data = JSON.parse(data);
            console.log("data media");
            console.log(data);
            let id = data.id;
            try {
                yield prisma.media.delete({ where: { id: id } });
                return JSON.stringify({ "msg": "ok" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static updateUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let user = data.data;
            console.log(user);
            try {
                yield prisma.users.update({ data: user, where: { id: data.id } });
                return JSON.stringify({ "msg": "ok" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static eventStats(request) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static attribuerStand(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let exist = yield prisma.event_stand.findFirst({ where: { id_user: data.idPartenaire, id_event: data.idEvent } });
            if (exist) {
                yield prisma.event_stand.update({ data: { id_stand: data.idStand, id_user: data.idPartenaire }, where: { id: exist.id } });
            }
            else {
                yield prisma.event_stand.create({ data: { id_stand: data.idStand, id_event: data.idEvent, id_user: data.idPartenaire } });
            }
            return JSON.stringify({ "msg": "ok" });
        });
    }
    static listeQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            let questions = yield prisma.questionnaire.findMany({
                include: { questions: true, questionnaire: true }
            });
            return JSON.stringify(questions);
        });
    }
    static getQuestions(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = request;
            const id = data.params;
            let questions = yield prisma.questionnaire.findFirst({
                where: { id: data.id },
                include: { questions: { include: { users: true } }, questionnaire: true }
            });
            return JSON.stringify(questions);
        });
    }
    static getEventQuestionnaire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            let quest = yield prisma.questionnaire.findFirst({
                where: { id_event: data.id },
                include: { questions: { include: { users: true } } },
            });
            return JSON.stringify(quest);
        });
    }
    static submitQuestionnaire(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = request;
            data = JSON.parse(data);
            console.log(data);
            let newQuestion = {};
            if (data.id) {
                yield prisma.questionnaire.update({ data: { libelle: data.libelle }, where: { id: data.id } });
                newQuestion = data;
            }
            else {
                newQuestion = yield prisma.questionnaire.create({
                    data: {
                        id_event: data.id_event,
                        libelle: data.libelle
                    }
                });
            }
            let questions = yield prisma.questions.findMany({ where: { id_questionnaire: newQuestion.id } });
            console.log("liste question : ");
            console.log(questions);
            data.questions.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let quest = questions.filter(q => q.id == element.id);
                console.log("question : ");
                console.log(quest);
                if (quest.length > 0) {
                    yield prisma.questions.update({
                        data: {
                            id_questionnaire: newQuestion.id,
                            question: element.question
                        }, where: { id: quest[0].id }
                    });
                }
                else {
                    yield prisma.questions.create({
                        data: {
                            id_questionnaire: newQuestion.id,
                            question: element.question
                        }
                    });
                }
            }));
            return JSON.stringify({ "msg": "ok" });
        });
    }
}
exports.default = HomeController;
//# sourceMappingURL=AdminController.js.map