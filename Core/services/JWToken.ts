import config from "../Routes/config/config";
import * as jwt from "jsonwebtoken";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class JWTToken {

    private static token: any



    public static makeJWT(data: any) {

        this.token = jwt.sign(data, config.jwtSecret, { expiresIn: '1h' });

    }

    public static async logout() {
        const token: any = this.getUser();

        await prisma.users.update({ data: { token: "" }, where: { id: token.id } })
        // UserModel.update({id:token.id},{token:null});

    }
    public static getToken() {
        return this.token
    }

    public static getUser() {
        let userToken = JWTToken.getToken();
        let user = {}
        if (this.token) {
            const base64Payload = this.token.split('.')[1];
            const payload = Buffer.from(base64Payload, 'base64');
            const infoUser = JSON.parse(payload.toString());


            user = prisma.users.findFirst({
                where: { id: infoUser.userId },

            }).then((user: any) => {


                if (user.token.length > 0) {
                    return user;

                } else {
                    return false;
                }
            });
            return user;
        } else {
            return false;
        }



    }
}

export default JWTToken;