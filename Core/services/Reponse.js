"use strict";
exports.__esModule = true;
var Response = /** @class */ (function () {
    function Response(reponse) {
        this.reponse = reponse;
        this.reponse = reponse;
    }
    Response.prototype.emit = function (data) {
        if (typeof data === "string") {
            this.reponse.setHeader('Content-Type', 'application/json');
            this.reponse.setHeader('Access-Control-Allow-Origin', '*');
            this.reponse.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
            this.reponse.setHeader('Access-Control-Allow-Methods', '*');
            this.reponse.end(data);
        }
        else {
            console.log("data");
            console.log(data);
            this.reponse.end(JSON.stringify({ "erreur": "format incorrect" }));
        }
    };
    return Response;
}());
exports["default"] = Response;
