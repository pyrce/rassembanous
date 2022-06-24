"use strict";
exports.__esModule = true;
var Multer = /** @class */ (function () {
    function Multer() {
    }
    Multer.uploadFile = function (request) {
        var cwd = process.cwd();
        //    const upload= multer({
        //         "dest":path.join(cwd,"client","public")
        //     })
        //     upload.single("affiche");
    };
    return Multer;
}());
exports["default"] = Multer;
