"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.geAllUsers = exports.activateAccount = exports.test = exports.signIn = exports.signUp = void 0;
var user_1 = __importDefault(require("../model/user"));
var database_1 = require("../services/database/database");
var validation_1 = require("./auth/validation");
var crypto_1 = __importDefault(require("crypto"));
var dotenv_1 = __importDefault(require("dotenv"));
var senders_1 = require("../mailers/senders");
var errors_1 = __importDefault(require("../services/errorHandlers/errors"));
dotenv_1["default"].config();
var database = database_1.client.db("squazzledb");
var Users = database.collection("user");
var SecretKey = String(process.env.SecretKey);
var jwsToken = String(process.env.AccessToken);
function generateHash(email) {
    var hashKey = crypto_1["default"].createHmac("SHA256", SecretKey)
        .update(email).digest('base64').toString();
    return hashKey;
}
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstName, lastName, phoneNumber, role, password, subject, userTaken, userPhone, hashedPassword, code, newUser, reg, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, phoneNumber = _a.phoneNumber, role = _a.role, password = _a.password;
                subject = "Squazzle Registration";
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 9]);
                console.log(req.body);
                return [4 /*yield*/, database_1.client.connect()];
            case 2:
                _b.sent();
                validation_1.registerValidation;
                console.log('i reach here');
                return [4 /*yield*/, (0, validation_1.validateEmail)(email)];
            case 3:
                userTaken = _b.sent();
                console.log('i reach here too');
                console.log(userTaken);
                if (userTaken) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            email: "Email is already taken",
                            message: "Registration failure"
                        })];
                }
                ;
                return [4 /*yield*/, (0, validation_1.validatePhonenumber)(phoneNumber)];
            case 4:
                userPhone = _b.sent();
                if (userPhone) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            email: "Phone number is already taken",
                            message: "Registration failure"
                        })];
                }
                ;
                hashedPassword = generateHash(password);
                console.log(hashedPassword);
                code = crypto_1["default"].randomInt(100000, 1000000);
                console.log(code);
                newUser = new user_1["default"]({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    password: hashedPassword,
                    verificationCode: code,
                    role: role,
                    email: email,
                    isEmailVerified: false,
                    registrationDate: Date.now()
                });
                return [4 /*yield*/, Users.insertOne(newUser)];
            case 5:
                reg = _b.sent();
                console.log('i reach here also');
                console.log(reg);
                if (!reg) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: reg
                        })];
                }
                if (reg) {
                    (0, senders_1.main)(newUser.email, newUser.firstName, newUser.lastName, newUser.verificationCode, subject)["catch"](console.error);
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "Account successfully created, Check your mail for activation code"
                        })];
                }
                return [3 /*break*/, 9];
            case 6:
                error_1 = _b.sent();
                return [2 /*return*/, res.send(new errors_1["default"]("something went wrong here is the error ".concat(error_1), 500))];
            case 7: return [4 /*yield*/, database_1.client.close()];
            case 8:
                _b.sent();
                return [7 /*endfinally*/];
            case 9:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var signIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, usercheck, _b, str, user_2, hashedPassword, token, profile, result, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, 6, 8]);
                return [4 /*yield*/, database_1.client.connect()];
            case 2:
                _c.sent();
                _b = Boolean;
                return [4 /*yield*/, (0, validation_1.isActive)(email)];
            case 3:
                usercheck = _b.apply(void 0, [_c.sent()]);
                str = usercheck.toString();
                console.log(str);
                if (str === "false") {
                    return [2 /*return*/, res.status(422).json({
                            success: false,
                            error: "User account is not active, Kindly activate account"
                        })];
                }
                ;
                return [4 /*yield*/, Users.findOne({ email: email })];
            case 4:
                user_2 = _c.sent();
                hashedPassword = generateHash(password);
                if (hashedPassword === user_2.password) {
                    token = (0, validation_1.generateAccessToken)(user_2);
                    profile = {
                        email: user_2.email,
                        role: user_2.role,
                        name: user_2.firstName + " " + user_2.lastName
                    };
                    result = {
                        user: profile,
                        //token: token,
                        expiresIn: 1800
                    };
                    //loginWelcomeSender(user);
                    // console.log(headers)
                    // res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Set-Cookie', token);
                    res.cookie("token", token, { expires: new Date(Date.now() + 1800) });
                    //console.log(req.cookies.token )
                    res.send(__assign(__assign({}, result), { message: "Login success", success: true }));
                    // Calling response.writeHead method
                    //res.writeHead(200,{'Content-Type': 'application/json'});
                }
                else {
                    console.log("i reach here");
                    return [2 /*return*/, res.status(403).json({
                            message: "Failed login attempt",
                            email: "Incorrect password",
                            success: false
                        })];
                }
                return [3 /*break*/, 8];
            case 5:
                error_2 = _c.sent();
                return [2 /*return*/, next(new errors_1["default"]("something went wrong here is the error ".concat(error_2), 500))];
            case 6: return [4 /*yield*/, database_1.client.close()];
            case 7:
                _c.sent();
                return [7 /*endfinally*/];
            case 8:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
var activateAccount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var code, user_3, modify, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.body.code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                return [4 /*yield*/, database_1.client.connect()];
            case 2:
                _a.sent();
                //console.log(typeof code)
                validation_1.isCodeactive;
                return [4 /*yield*/, Users.findOne({ verificationCode: Number(code) })
                    //console.log(user)
                ];
            case 3:
                user_3 = _a.sent();
                //console.log(user)
                (0, senders_1.welcomeSender)(user_3);
                if (!user_3) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Invalid code",
                            success: false
                        })];
                }
                else if (user_3.isEmailVerified) {
                    return [2 /*return*/, res.status(409).json({
                            message: "Email already verified",
                            success: false
                        })];
                }
                return [4 /*yield*/, Users.findOneAndUpdate({ verificationCode: user_3.verificationCode }, { $set: { isEmailVerified: true } })];
            case 4:
                modify = _a.sent();
                //console.log(modify)
                (0, senders_1.welcomeSender)(user_3);
                return [2 /*return*/, res.status(201).json({
                        message: "Email verification success",
                        success: true
                    })];
            case 5:
                error_3 = _a.sent();
                return [2 /*return*/, next(new errors_1["default"]("something went wrong here is the error ".concat(error_3), 500))];
            case 6: return [4 /*yield*/, database_1.client.close()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.activateAccount = activateAccount;
var geAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                return [4 /*yield*/, database_1.client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, Users.find({}).toArray()];
            case 2:
                allUsers = _a.sent();
                if (!allUsers) {
                    return [2 /*return*/, res.status(402).json({
                            success: false,
                            error: "No user found"
                        }).statusCode];
                }
                else {
                    return [2 /*return*/, res.json({
                            success: true,
                            data: allUsers
                        }).statusCode];
                }
                return [3 /*break*/, 6];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, next(new errors_1["default"]("something went wrong here is the error ".concat(error_4), 500))];
            case 4: return [4 /*yield*/, database_1.client.close()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.geAllUsers = geAllUsers;
var test = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("??k");
        return [2 /*return*/];
    });
}); };
exports.test = test;
