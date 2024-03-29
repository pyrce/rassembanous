import { createServer, IncomingMessage, ServerResponse } from 'http';
import Request from "../services/Request";
type route = { data: object, view: string }
import * as path from "path";
import Response from "../services/Reponse";
import JWTToken from "../services/JWToken";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer"
import * as dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'
import  * as fs  from 'fs';
const prisma = new PrismaClient();

dotenv.config();

class HomeController {

    public static getHome(res:Response) {

        const rootDir = path.resolve('./');

        // let userToken = JWTToken.getToken();

        // var base64Payload = userToken.split('.')[1];
        // var payload = Buffer.from(base64Payload, 'base64');
        // let infoUser = JSON.parse(payload.toString());
        const maReponse:any={contentType:""};
        //     const view = Render.make("home", { rootDir:rootDir,user: infoUser, page: "Home" });
        const file="./client/dist/index.html";
        const buffer=fs.readFileSync(file);

        const fileContent = buffer.toString();
        maReponse.contentType="text/html";
        maReponse.content=fileContent;
        return maReponse;
        //   ///  return view;

    }

    public static async contact(request: Request) {
        let { data } = request;
        data = JSON.parse(data);


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            //requireTLS: true,
            auth: {
                type: "OAuth2",
                user: process.env.MAIL_USER,
                // pass: process.env.MAIL_PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.SECRET_CLIENT,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            },
            logger: true
        });

        const info = await transporter.sendMail({
            from: data.email,
            to: "fetheve2@gmail.com",
            subject: data.objet,
            text: "Hello world?",
            html: data.message,
            headers: { 'x-myheader': 'test header' }
        });


    }

    public static login() {
        // let rootDir = path.resolve('./');

        // const view = Render.make("login", {rootDir:rootDir,user: "toto", page: "Home"   });

        // return view;
    }

    public static async identifier(req: Request) {
        let { data } = req;
        data = JSON.parse(data);

        const user: any = await prisma.users.findFirst({ where: { "login": data.login } });
        // user = JSON.parse(JSON.stringify(user));
        let response = "";

        if (user) {

            bcrypt.compare(data.password, user.password, function (err, result) {

                if (result == true) {
                    const userData = { userId: user.id, role: user.id_role, nom: user.nom, prenom: user.prenom }
                    JWTToken.makeJWT(userData);
                    const userToken = JWTToken.getToken();
                    //UsersModel.update({id:user[0].id},{token:userToken});
                    prisma.users.update({ data: { token: userToken }, where: { id: user.id } }).then(() => {


                        response = JSON.stringify({ msg: 'connecter', token: userToken });
                    })
                } else {
                    response = JSON.stringify({ status: "KO", msg: "identifiants incorrect" });
                }
            });
        } else {
            response = JSON.stringify({ status: "KO", msg: "utilisateur non trouvé" });
        }
        return response;
    }

}

export default HomeController;