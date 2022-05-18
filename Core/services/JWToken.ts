import config  from "../Routes/config/config";
import * as jwt from "jsonwebtoken";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class JWTToken{

private static token : any



public static makeJWT(data:any){

    this.token=jwt.sign(data, config.jwtSecret,{ expiresIn: '1h' });

}

public static async logout(){
    let token=await this.getUser();

   await prisma.users.update({data:{token:""},where:{ id:token.id } })
   // UserModel.update({id:token.id},{token:null});

}
public static getToken(){
    return this.token
}

public static async getUser(){
    let userToken=JWTToken.getToken();

    if(this.token){
    var base64Payload = this.token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    let infoUser=JSON.parse(payload.toString());

    let user:any=    await prisma.users.findFirst({
        where:{id:infoUser.userId},

    });
    if(user.token.length>0){
        return user;
    
    }else{
        return false;
    }
    }else{
        return false;
    }
}
}

export default JWTToken;