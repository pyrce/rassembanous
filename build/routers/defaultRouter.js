"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var ejs = __importStar(require("ejs"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Display page content
 * @param {object} entries
 *
 */
var displayPage = function (entries) {
    var templatePath = path.join(__dirname, '..', 'views', 'template.ejs');
    var values = { entries: entries };
    var template = fs.readFileSync(templatePath, 'utf8');
    return ejs.render(template, values);
};
/**
 * General router handler
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
var routerHandler = function (request, response) {
    switch (request.url) {
        case '/': {
            if (request.method === 'GET') {
                var entries = { title: "mon titre via ejs" };
                var output = displayPage(entries);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(output);
                return response.end();
            }
            break;
        }
        default: {
            response.statusCode = 404;
            response.end();
        }
    }
};
exports.default = routerHandler;
