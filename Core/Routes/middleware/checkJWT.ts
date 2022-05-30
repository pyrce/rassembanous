import Request from "../../services/Request";
import Response from "../../services/Reponse";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import Router from "../Router";
import { ServerResponse } from 'http';
import JWTToken from "../../services/JWToken";

class checkJWT {

  public static checkToken(options: any) {
    //Get the jwt token from the head
    const token = <string>JWTToken.getToken();
    let jwtPayload;

    if (options.isAuth) {
      //Try to validate the token and get data
      if (token != undefined) {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);

        let user: any = JWTToken.getUser();


        if (options.id_role === user.role) {
          return false;
        }

        return true
      } else {
        return false;

      }
    }
  }

}
export default checkJWT;
