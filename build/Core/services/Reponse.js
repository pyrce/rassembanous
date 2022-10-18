"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(reponse) {
        this.reponse = reponse;
        this.reponse = reponse;
    }
    emit(data) {
        console.log("data");
        console.log(data);
        if (typeof data === "string") {
            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);
        }
        else {
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    }
}
exports.default = Response;
//# sourceMappingURL=Reponse.js.map