"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var MethodEnum_1 = require("../Routes/MethodEnum");
var url = require('url');
var Request = /** @class */ (function () {
    function Request(req) {
        this.req = req;
        this.url = req.url;
        this.method = req.method;
    }
    Request.prototype.setData = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var baseURI, path, params, query, body, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        baseURI = url.parse(req.url, true);
                        path = (_a = baseURI.pathname) === null || _a === void 0 ? void 0 : _a.split('/');
                        params = path === null || path === void 0 ? void 0 : path.slice(1)[path.length - 2];
                        query = baseURI.query;
                        _b = this.method;
                        switch (_b) {
                            case MethodEnum_1["default"].GET: return [3 /*break*/, 1];
                            case MethodEnum_1["default"].POST: return [3 /*break*/, 2];
                            case MethodEnum_1["default"].PUT: return [3 /*break*/, 4];
                            case MethodEnum_1["default"].DELETE: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        this.url = url.parse(req.url).pathname;
                        this.data = { params: params, query: query };
                        return [3 /*break*/, 9];
                    case 2:
                        _c = this;
                        return [4 /*yield*/, Promise.resolve(this.parseBody(req))];
                    case 3:
                        _c.data = _f.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        _d = this;
                        return [4 /*yield*/, Promise.resolve(this.parseBody(req))];
                    case 5:
                        _d.data = _f.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        _e = this;
                        return [4 /*yield*/, Promise.resolve(this.parseBody(req))];
                    case 7:
                        _e.data = _f.sent();
                        return [3 /*break*/, 9];
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Request.prototype.parseBody = function (req) {
        var body = [];
        return new Promise(function (resolve, reject) {
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                var parsedBody = Buffer.concat(body).toString();
                return resolve(parsedBody);
            });
        });
    };
    Request.instance = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new Request(req);
                        return [4 /*yield*/, request.setData(req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, request];
                }
            });
        });
    };
    return Request;
}());
exports["default"] = Request;
