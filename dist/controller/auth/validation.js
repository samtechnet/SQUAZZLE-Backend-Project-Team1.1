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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validatePhonenumber = exports.signUpValidationRules = exports.validate = exports.validationRules = exports.generateAccessToken = exports.isActive = exports.validateEmail = exports.isCodeactive = exports.loginschema = exports.registerValidation = void 0;
var express_validator_1 = require("express-validator");
var database_1 = require("../../services/database/database");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var database = database_1.client.db("squazzledb");
var Users = database.collection("user");
var validationRules = function () {
    return [
        (0, express_validator_1.check)("email")
            .trim().isEmail().normalizeEmail().withMessage('please enter a valid email'),
        // check("name")
        // .trim()
        // .notEmpty().withMessage('name can not be empty')
        // .isLength({ min: 1, max: 20})
        // .withMessage
        // ("Name  must be between 1 and 20 characters"),
        (0, express_validator_1.check)("password")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage("Password must be between 6 and 16 characters")
    ];
};
exports.validationRules = validationRules;
var signUpValidationRules = function () {
    return [
        (0, express_validator_1.check)("email")
            .trim().isEmail().normalizeEmail().withMessage('please enter a valid email'),
        (0, express_validator_1.check)("firstName")
            .trim()
            .notEmpty().withMessage('first name can not be empty')
            .isLength({ min: 1, max: 20 })
            .withMessage("First name  must be between 1 and 20 characters"),
        (0, express_validator_1.check)("lastName")
            .trim()
            .notEmpty().withMessage('last name can not be empty')
            .isLength({ min: 1, max: 20 })
            .withMessage("Last name  must be between 1 and 20 characters"),
        (0, express_validator_1.check)("password")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage("Password must be between 6 and 16 characters"),
        (0, express_validator_1.check)("phoneNumber")
            .trim()
            .notEmpty().withMessage('Phone number can not be empty')
            .isLength({ min: 11, max: 11 })
            .withMessage("Phone number must be 11 digit long")
    ];
};
exports.signUpValidationRules = signUpValidationRules;
var validate = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    ;
    var resultErrors = [];
    errors.array().map(function (err) {
        var _a;
        return resultErrors.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    resultErrors.push({ message: "Action unsuccessful" });
    resultErrors.push({ success: false });
    var errorObject = Object.assign.apply(Object, __spreadArray([{}], resultErrors, false));
    return res.status(422).json(errorObject);
};
exports.validate = validate;
var schema = [
    (0, express_validator_1.body)('email').isEmail().withMessage('email must contain a valid email addres'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
];
exports.registerValidation = schema;
var loginschema = [
    (0, express_validator_1.body)('email').isEmail().withMessage('email must contain a valid email addres'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
];
exports.loginschema = loginschema;
var isCodeactive = [
    (0, express_validator_1.body)('code').isLength({ min: 6 }).isNumeric().withMessage('code must be at least 6 character long')
];
exports.isCodeactive = isCodeactive;
var validateEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, database_1.client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, Users.findOne({ email: email })];
            case 2:
                user = _a.sent();
                console.log(user);
                if (user) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validateEmail = validateEmail;
var validatePhonenumber = function (phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, database_1.client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, Users.findOne({ phoneNumber: phoneNumber })];
            case 2:
                user = _a.sent();
                console.log(user);
                if (user) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validatePhonenumber = validatePhonenumber;
var isActive = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, database_1.client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, Users.findOne({ email: email })];
            case 2:
                user = _a.sent();
                console.log(user.isEmailVerified + "  from isActive");
                if (user.isEmailVerified === "false") {
                    return [2 /*return*/, false];
                }
                else {
                    return [2 /*return*/, true];
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.isActive = isActive;
var jwsToken = String(process.env.AccessToken);
function generateAccessToken(user) {
    var data = {
        user_id: user._id,
        role: user.role,
        email: user.email,
        name: (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName)
    };
    return jsonwebtoken_1["default"].sign(data, jwsToken, { expiresIn: '1800s' });
}
exports.generateAccessToken = generateAccessToken;
