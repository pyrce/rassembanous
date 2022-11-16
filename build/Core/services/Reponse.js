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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Response {
    constructor(reponse) {
        this.reponse = reponse;
        this.reponse = reponse;
    }
    emit(data) {
        console.log("typeof data :" + typeof data);
        if (typeof data === "string") {
            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);
        }
        else if (data.contentType) {
            // console.log(data);
            const filePath = "./client/dist/index.html";
            if (data.contentType) {
                this.reponse.setHeader('Access-Control-Allow-Origin', '*');
                this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
                this.reponse.setHeader('Access-Control-Allow-Methods', '*');
                // this.reponse.writeHead(200, {
                //     "Content-Type": "application/octet-stream",
                //     "Content-Disposition": "attachment; filename=" + filePath
                // });
                fs.createReadStream(filePath).pipe(this.reponse);
                // this.reponse.writeHead(200,{"Content-type":data.contentType});
                this.reponse.end(data.content);
            }
        }
        else {
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }
}
exports.default = Response;
//# sourceMappingURL=Reponse.js.map