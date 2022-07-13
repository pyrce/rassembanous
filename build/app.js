"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Core/services/Server"));
const Routes_1 = __importDefault(require("./Core/Routes/Routes"));
Routes_1.default.make();
Server_1.default.start();
//# sourceMappingURL=app.js.map