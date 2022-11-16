

import Request from "../services/Request";
type route = { data: object, view: string }
import * as path from "path";
import Response from "../services/Reponse";
import JWTToken from "../services/JWToken";
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'

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

prisma.$on('query', async (e) => {

    console.log(`${e.query} ${e.params} \n`)

});
class HomeController {

    public static async getUsers(request: Request) {

        let { data } = request;
        data = JSON.parse(data);


        const search = data.search !== "undefined" ? data.search : "";

        // UsersModel.setJoinTable([{class:RolesModel,fk:"id"}]);
        let allUsers = await prisma.users.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            where: { OR: [{ nom: { contains: search }, prenom: { contains: search } }] }
        }

        );

        allUsers = JSON.parse(JSON.stringify(allUsers));

        let total = await prisma.users.findMany({});
        total = JSON.parse(JSON.stringify(total)).length;

        let roles = await prisma.roles.findMany({});

        return JSON.stringify({ alluser: allUsers, roles, total });

    }

    public static async getCategories(request: Request) {
        const { data } = request;
        // data = JSON.parse(data);

        let categories = await prisma.categories.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit
        });

        return JSON.stringify({ categories });
    }

    public static async addCategorie(request: Request) {
        let { data } = request;
        data = JSON.parse(data);

        if (data.id) {
            await prisma.categories.update({ data: { categorie: data.categorie, icon: data.icon }, where: { id: data.id } })

        } else {
            const categories = await prisma.categories.create({ data });
        }
        return JSON.stringify({ "msg": "ok" });
    }


    public static async addUser(request: Request) {

        let { data } = request;
        data = JSON.parse(data);
        const user = data.data


        try {

            await prisma.users.create({ data: user })
            return JSON.stringify({ "msg": "ok" })
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteUser(request: Request) {

        let { data } = request;
        data = JSON.parse(data);

        const id = data.id
        try {


            await prisma.users.delete({ where: { id } })
            return JSON.stringify({ "msg": "ok" })
        } catch (error) {
            console.log(error)
        }
    }


    public static async deleteCat(request: Request) {

        let { data } = request;
        data = JSON.parse(data);

        const id = data.id
        try {


            await prisma.categories.delete({ where: { id: id } })
            return JSON.stringify({ "msg": "ok" })
        } catch (error) {
            console.log(error)
        }
    }
    public static async deleteImage(request: Request) {

        let { data } = request;
        //  data = JSON.parse(data);
        console.log("data media")
        console.log(data)
        const id = data.id
        try {


            await prisma.media.delete({ where: { id } })
            return JSON.stringify({ "msg": "ok" })
        } catch (error) {
            console.log(error)
        }
    }
    public static async updateUser(request: Request) {

        let { data } = request;
        data = JSON.parse(data);
        let user = data.data
        console.log(user)
        try {


            await prisma.users.update({ data: user, where: { id: data.id } })
            return JSON.stringify({ "msg": "ok" })
        } catch (error) {
            console.log(error)
        }
    }

    public static async eventStats(request: Request) {


    }

    public static async attribuerStand(request: Request) {
        let { data } = request;
        data = JSON.parse(data);

        const exist = await prisma.event_stand.findFirst({ where: { id_user: data.idPartenaire, id_event: data.idEvent } });

        if (exist) {
            await prisma.event_stand.update({ data: { id_stand: data.idStand, id_user: data.idPartenaire }, where: { id: exist.id } });
        }
        else {
            await prisma.event_stand.create({ data: { id_stand: data.idStand, id_event: data.idEvent, id_user: data.idPartenaire } })
        }

        return JSON.stringify({ "msg": "ok" });
    }

    public static async listeQuestions() {

        let questions = await prisma.questionnaire.findMany({
            include: { questions: true, questionnaire: true }
        });


        return JSON.stringify(questions);
    }

    public static async getQuestions(request: Request) {
        const { data } = request;

        const id = data.params;

        const questions = await prisma.questionnaire.findFirst({
            where: { id: data.id },
            include: { questions: { include: { users: true } }, questionnaire: true }
        });


        return JSON.stringify(questions);
    }

    public static async getEventQuestionnaire(request: Request) {
        let { data } = request;
        data = JSON.parse(data);

        const quest = await prisma.questionnaire.findFirst({
            where: { id_event: data.id },
            include: { questions: { include: { users: true } } },

        });
        return JSON.stringify(quest);


    }

    public static async submitQuestionnaire(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        console.log(data)
        let newQuestion: any = {};

        if (data.id) {

            await prisma.questionnaire.update({ data: { libelle: data.libelle }, where: { id: data.id } });
            newQuestion = data;

        } else {

            newQuestion = await prisma.questionnaire.create({
                data: {
                    id_event: data.id_event,
                    libelle: data.libelle
                }
            });

        }

        let questions = await prisma.questions.findMany({ where: { id_questionnaire: newQuestion.id } });

        console.log("liste question : ")
        console.log(questions);

        data.questions.forEach(async (element: any) => {
            let quest: any = questions.filter(q => q.id === element.id);
            console.log("question : ")
            console.log(quest);

            if (quest.length > 0) {

                await prisma.questions.update({
                    data: {
                        id_questionnaire: newQuestion.id,
                        question: element.question
                    }, where: { id: quest[0].id }
                })
            } else {
                await prisma.questions.create({
                    data: {
                        id_questionnaire: newQuestion.id,
                        question: element.question

                    }
                })
            }

        })


        return JSON.stringify({ "msg": "ok" });
    }

}

export default HomeController;