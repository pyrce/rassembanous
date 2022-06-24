var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from "../Routes/config/config";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class JWTToken {
    static makeJWT(data) {
        this.token = jwt.sign(data, config.jwtSecret, { expiresIn: '1h' });
    }
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = this.getUser();
            yield prisma.users.update({ data: { token: "" }, where: { id: token.id } });
            // UserModel.update({id:token.id},{token:null});
        });
    }
    static getToken() {
        return this.token;
    }
    static getUser() {
        let userToken = JWTToken.getToken();
        let user = {};
        if (this.token) {
            var base64Payload = this.token.split('.')[1];
            var payload = Buffer.from(base64Payload, 'base64');
            let infoUser = JSON.parse(payload.toString());
            console.log("infouser: ");
            console.log(infoUser);
            user = prisma.users.findFirst({
                where: { id: infoUser.userId },
            }).then((user) => {
                if (user.token.length > 0) {
                    return user;
                }
                else {
                    return false;
                }
            });
            return user;
        }
        else {
            return false;
        }
    }
}
export default JWTToken;
