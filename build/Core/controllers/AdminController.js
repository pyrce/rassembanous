"use strict";
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
prisma.$on('query', async (e) => {
    console.log(`${e.query} ${e.params} \n`);
});
class HomeController {
    static async getUsers(request) {
        let { data } = request;
        data = JSON.parse(data);
        let search = data.search != "undefined" ? data.search : "";
        // UsersModel.setJoinTable([{class:RolesModel,fk:"id"}]);
        let allUsers = await prisma.users.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            where: { OR: [{ nom: { contains: search }, prenom: { contains: search } }] }
        });
        allUsers = JSON.parse(JSON.stringify(allUsers));
        let total = await prisma.users.findMany({});
        total = JSON.parse(JSON.stringify(total)).length;
        let roles = await prisma.roles.findMany({});
        return JSON.stringify({ alluser: allUsers, roles: roles, total: total });
    }
    static async getCategories(request) {
        let { data } = request;
        //data = JSON.parse(data);
        let categories = await prisma.categories.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit
        });
        return JSON.stringify({ categories: categories });
    }
    static async addCategorie(request) {
        let { data } = request;
        data = JSON.parse(data);
        if (data.id) {
            await prisma.categories.update({ data: { categorie: data.categorie, icon: data.icon }, where: { id: data.id } });
        }
        else {
            let categories = await prisma.categories.create({ data: data });
        }
        return JSON.stringify({ "msg": "ok" });
    }
    static async addUser(request) {
        let { data } = request;
        data = JSON.parse(data);
        let user = data.data;
        try {
            await prisma.users.create({ data: user });
            return JSON.stringify({ "msg": "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async deleteUser(request) {
        let { data } = request;
        data = JSON.parse(data);
        let id = data.id;
        try {
            await prisma.users.delete({ where: { id: id } });
            return JSON.stringify({ "msg": "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async deleteCat(request) {
        let { data } = request;
        data = JSON.parse(data);
        let id = data.id;
        try {
            await prisma.categories.delete({ where: { id: id } });
            return JSON.stringify({ "msg": "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async deleteImage(request) {
        let { data } = request;
        //  data = JSON.parse(data);
        console.log("data media");
        console.log(data);
        let id = data.id;
        try {
            await prisma.media.delete({ where: { id: id } });
            return JSON.stringify({ "msg": "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async updateUser(request) {
        let { data } = request;
        data = JSON.parse(data);
        let user = data.data;
        console.log(user);
        try {
            await prisma.users.update({ data: user, where: { id: data.id } });
            return JSON.stringify({ "msg": "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async eventStats(request) {
    }
    static async attribuerStand(request) {
        let { data } = request;
        data = JSON.parse(data);
        let exist = await prisma.event_stand.findFirst({ where: { id_user: data.idPartenaire, id_event: data.idEvent } });
        if (exist) {
            await prisma.event_stand.update({ data: { id_stand: data.idStand, id_user: data.idPartenaire }, where: { id: exist.id } });
        }
        else {
            await prisma.event_stand.create({ data: { id_stand: data.idStand, id_event: data.idEvent, id_user: data.idPartenaire } });
        }
        return JSON.stringify({ "msg": "ok" });
    }
    static async listeQuestions() {
        let questions = await prisma.questionnaire.findMany({
            include: { questions: true, questionnaire: true }
        });
        return JSON.stringify(questions);
    }
    static async getQuestions(request) {
        const { data } = request;
        const id = data.params;
        let questions = await prisma.questionnaire.findFirst({
            where: { id: data.id },
            include: { questions: { include: { users: true } }, questionnaire: true }
        });
        return JSON.stringify(questions);
    }
    static async getEventQuestionnaire(request) {
        let { data } = request;
        data = JSON.parse(data);
        let quest = await prisma.questionnaire.findFirst({
            where: { id_event: data.id },
            include: { questions: { include: { users: true } } },
        });
        return JSON.stringify(quest);
    }
    static async submitQuestionnaire(request) {
        let { data } = request;
        data = JSON.parse(data);
        console.log(data);
        let newQuestion = {};
        if (data.id) {
            await prisma.questionnaire.update({ data: { libelle: data.libelle }, where: { id: data.id } });
            newQuestion = data;
        }
        else {
            newQuestion = await prisma.questionnaire.create({
                data: {
                    id_event: data.id_event,
                    libelle: data.libelle
                }
            });
        }
        let questions = await prisma.questions.findMany({ where: { id_questionnaire: newQuestion.id } });
        console.log("liste question : ");
        console.log(questions);
        data.questions.forEach(async (element) => {
            let quest = questions.filter(q => q.id == element.id);
            console.log("question : ");
            console.log(quest);
            if (quest.length > 0) {
                await prisma.questions.update({
                    data: {
                        id_questionnaire: newQuestion.id,
                        question: element.question
                    }, where: { id: quest[0].id }
                });
            }
            else {
                await prisma.questions.create({
                    data: {
                        id_questionnaire: newQuestion.id,
                        question: element.question
                    }
                });
            }
        });
        return JSON.stringify({ "msg": "ok" });
    }
}
exports.default = HomeController;
//# sourceMappingURL=AdminController.js.map