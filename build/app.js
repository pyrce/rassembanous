"use strict";
// import { createServer } from 'http';
// import routerhandler from "./routers/defaultRouter";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const port = 3000;
// const server = createServer(routerhandler);
// server.listen(port);
var ConfigServer_1 = __importDefault(require("./services/ConfigServer"));
var defaultRouter_1 = __importDefault(require("./routers/defaultRouter"));
var server = new ConfigServer_1.default(3000);
server.init(defaultRouter_1.default);
