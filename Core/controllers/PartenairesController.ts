
import Request from "../../Core/services/Request";
import * as path from "path";

import bcrypt from "bcrypt"

import JWTToken from "../services/JWToken";
import fs from "fs";
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
class PartenairesController {

    public static async getPartenaires() {

        try {


            const partenaires = await prisma.users.findMany({ where: { id_role: 2 } });
            //partenaires = JSON.parse(JSON.stringify(partenaires));

            return JSON.stringify(partenaires)
            //  return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
        } catch (error) {
            console.log(error)
        }
    }

    public static async getPartenaire(request: Request) {

        try {
            const { data } = request;

            const id = data.params;

            //  partenaireClass.setJoinTable(EventPartenaire,"id_Partenaire");
            //  eventsClass.setJoinTable([{class:categoriesModel,fk:"id"}] )
            //  EventPartenaire.setJoinTable([  { class: eventsClass, fk: "id" } ]);

            let listEvents = await prisma.evenements.findMany({
                include: {
                    eventStand: {
                        where: {
                            id_user: parseInt(id)
                        },

                    },
                    media: { where: { id_type: 1 }, select: { image: true } }
                }
            })
            let partenaire = await prisma.users.findUnique({ where: { id: +id } })

            //partenaire = JSON.parse(JSON.stringify(partenaire));
            // listEvents = JSON.parse(JSON.stringify(listEvents));

            let follow = {};
            let isFollowed = false;

            let userToken: any = JWTToken.getUser();

            if (userToken != false) {

                let follow = await prisma.partenaire_user.findFirst({
                    where: {
                        id_user: userToken.id, id_partenaire: +id
                    }

                });

                // follow = JSON.parse(JSON.stringify(follow));
                isFollowed = follow ? true : false;
            }
            const response = { isFollowed: isFollowed, listEvents, partenaire };
            return JSON.stringify(response);
            //return Render.make('partenaire', { user: "toto", page: "detail",isFollowed:isFollowed,listEvents:listEvents, partenaire: partenaire[0] })
        } catch (error) {
            console.log(error)
        }
    }

    public static async getEvents(request: Request) {
        let { data } = request;
        data = JSON.parse(data);
        let queryLimit: any = {}
        queryLimit["limit"] = data.limit
        queryLimit["offset"] = data.offset

        let response = {};
        let total = {};
        const today = new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString();

        //eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
        /// eventsClass.setJoinTable([{ class: categoriesModel, fk: "id_categorie" }]);
        //  eventsClass.setJoinTable([{ class: eventPartenaire, fk: "id_partenaire" }]);

        //   let lastEvents = await eventsClass.findAll({"id_partenaire":data.id}, queryLimit);
        let lastEvents = await prisma.evenements.findMany({
            skip: data.offset != null ? data.offset : undefined,
            take: data.limit,
            where: {
                dateFin: { gt: new Date() }
            }
        }
        );

        total = await prisma.evenements.findMany({

            where: {
                dateFin: { gt: new Date() }
            }
        }
        );

        total = JSON.parse(JSON.stringify(total)).length;
        lastEvents = JSON.parse(JSON.stringify(lastEvents));
        response = { listEvents: lastEvents, total };


        return JSON.stringify(response);

    }

    public static async getMyEvent(request: Request) {
        try {
            let { data } = request;
            data = JSON.parse(data);
            const id = data.id;

            // eventsClass.setJoinTable([{class:LieuModel,fk:"id_lieu"}]);
            let event: any = await prisma.evenements.findFirst({ where: { id: parseInt(id) } })
            //event = JSON.parse(JSON.stringify(event));
            let rootDir = path.resolve('./');

            const userToken = JWTToken.getUser();
            let response = {};
            let myEvent = [];

            const categories = await prisma.categories.findMany();

            const estTermine = new Date(event.dateLimit).getTime() < new Date().getTime() ? 1 : 0;


            response = { estTermine, event, categories }
            return JSON.stringify(response);
        } catch (error) {
            console.log(error)
        }
    }
    public static async getListPartenaires(request: Request) {

        try {
            const { data } = request;
            let search = data.query.s;

            let partenaires = await prisma.users.findMany({
                skip: data.offset != null ? data.offset : undefined,
                take: data.limit,
                where: {
                    nom: { contains: search }
                    ,
                    prenom: { contains: search }
                }
            });

            partenaires = JSON.parse(JSON.stringify(partenaires));

            return JSON.stringify(partenaires)
            // return Render.make('partenaires', { user: "toto", page: "detail", partenaires: partenaires})
        } catch (error) {

        }
    }

}


export default PartenairesController;