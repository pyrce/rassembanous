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
const config_1 = __importDefault(require("../Routes/config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class JWTToken {
    static makeJWT(data) {
        this.token = jwt.sign(data, config_1.default.jwtSecret, { expiresIn: '1h' });
    }
    static async logout() {
        const token = this.getUser();
        await prisma.users.update({ data: { token: "" }, where: { id: token.id } });
        // UserModel.update({id:token.id},{token:null});
    }
    static getToken() {
        return this.token;
    }
    static getUser() {
        let userToken = JWTToken.getToken();
        let user = {};
        if (this.token) {
            const base64Payload = this.token.split('.')[1];
            const payload = Buffer.from(base64Payload, 'base64');
            const infoUser = JSON.parse(payload.toString());
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
exports.default = JWTToken;
//# sourceMappingURL=JWToken.js.map