import config  from "../Routes/config/config";
import * as jwt from "jsonwebtoken";


class JWTToken{

private static token : any



public static makeJWT(data:any){

    this.token=jwt.sign(data, config.jwtSecret,{ expiresIn: '1h' });

}

public static getToken(){
    return this.token
}
}

export default JWTToken;