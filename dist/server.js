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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var errors_1 = __importDefault(require("./services/errorHandlers/errors"));
var database_1 = require("./services/database/database");
var errrorController_1 = require("./middleware/errrorController");
var userRoutes_1 = require("./routes/userRoutes");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var documentation_1 = __importDefault(require("./controller/documentation"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1["default"].config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use((0, cookie_parser_1["default"])());
app.use("/documentations", swagger_ui_express_1["default"].serve);
app.use("/documentations", swagger_ui_express_1["default"].setup(documentation_1["default"]));
//routes
(0, userRoutes_1.user_routes)(app);
app.get("/squazzle", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({
            success: true,
            message: "welcome to squazzle api, our sweat documentation is on this url endpoint : https://gallery-one-app.herokuapp.com/ ",
            note: "should you need any assistance kindly contact our surport on 08161228946"
        });
        return [2 /*return*/];
    });
}); });
app.all('*', function (req, res, next) {
    throw new errors_1["default"]("Requested URL ".concat(req.path, " not found!"), 404);
});
app.use(errrorController_1.errorController);
exports["default"] = app;
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    function run() {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 3, 5]);
                        return [4 /*yield*/, database_1.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, database_1.client.db("admin").command({ ping: 1 })];
                    case 2:
                        connection = _a.sent();
                        console.log(connection);
                        console.log("Server started successfulyy on PORT https://localhost:".concat(PORT));
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, database_1.client.close()];
                    case 4:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return __generator(this, function (_a) {
        run()["catch"](console.dir);
        return [2 /*return*/];
    });
}); });
