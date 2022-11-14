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
const JWToken_1 = __importDefault(require("../services/JWToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const prisma = new client_1.PrismaClient();
dotenv.config();
class HomeController {
    static getHome(res) {
        let rootDir = path.resolve('./');
        // let userToken = JWTToken.getToken();
        // var base64Payload = userToken.split('.')[1];
        // var payload = Buffer.from(base64Payload, 'base64');
        // let infoUser = JSON.parse(payload.toString());
        let maReponse = { contentType: "" };
        //     const view = Render.make("home", { rootDir:rootDir,user: infoUser, page: "Home" });
        const file = "./client/dist/index.html";
        const buffer = fs.readFileSync(file);
        console.log("buffer type :" + typeof buffer);
        console.log(buffer);
        const fileContent = buffer.toString();
        maReponse.contentType = "text/html";
        maReponse.content = fileContent;
        return maReponse;
        //   ///  return view;
    }
    static async contact(request) {
        let { data } = request;
        data = JSON.parse(data);
        console.log(data);
        const transporter = nodemailer_1.default.createTransport({
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
    static login() {
        // let rootDir = path.resolve('./');
        // const view = Render.make("login", {rootDir:rootDir,user: "toto", page: "Home"   });
        // return view;
    }
    static async identifier(req) {
        let { data } = req;
        data = JSON.parse(data);
        let user = await prisma.users.findFirst({ where: { "login": data.login } });
        // user = JSON.parse(JSON.stringify(user));
        let response = "";
        if (user) {
            console.log("user : ");
            console.log(user);
            bcrypt_1.default.compare(data.password, user.password, function (err, result) {
                console.log("result : ");
                console.log(result);
                if (result == true) {
                    let userData = { userId: user.id, role: user.id_role, nom: user.nom, prenom: user.prenom };
                    JWToken_1.default.makeJWT(userData);
                    let userToken = JWToken_1.default.getToken();
                    //UsersModel.update({id:user[0].id},{token:userToken});
                    prisma.users.update({ data: { token: userToken }, where: { id: user.id } }).then(() => {
                        response = JSON.stringify({ msg: 'connecter', token: userToken });
                    });
                }
                else {
                    response = JSON.stringify({ status: "KO", msg: "identifiants incorrect" });
                }
            });
        }
        else {
            response = JSON.stringify({ status: "KO", msg: "utilisateur non trouvé" });
        }
        return response;
    }
}
exports.default = HomeController;
//# sourceMappingURL=HomeController.js.map