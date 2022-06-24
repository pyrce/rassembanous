import * as jwt from "jsonwebtoken";
import config from "../config/config";
import JWTToken from "../../services/JWToken";
class checkJWT {
    static checkToken(options) {
        //Get the jwt token from the head
        const token = JWTToken.getToken();
        let jwtPayload;
        if (options.isAuth) {
            //Try to validate the token and get data
            if (token != undefined) {
                jwtPayload = jwt.verify(token, config.jwtSecret);
                let user = JWTToken.getUser();
                if (options.id_role === user.role) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
    }
}
export default checkJWT;
