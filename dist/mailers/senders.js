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
exports.welcomeSender = exports.main = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
//import smtpTransport from "../lib/smtp-transport"
dotenv_1["default"].config();
var _a = process.env, GMAIL_HOST = _a.GMAIL_HOST, GMAIL_PORT = _a.GMAIL_PORT, GMAIL_USESSL = _a.GMAIL_USESSL, GMAIL_USERNAME = _a.GMAIL_USERNAME, GMAIL_PASSWORD = _a.GMAIL_PASSWORD, FROM = _a.FROM;
var transporter = nodemailer_1["default"].createTransport({
    host: GMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
});
function main(emails, firstName, lastName, code, subject) {
    return __awaiter(this, void 0, void 0, function () {
        var output, mailOptions;
        return __generator(this, function (_a) {
            output = "\n    <p>Welcome to Squazzle ".concat(firstName + " " + lastName, "</p>\n    <h3>Message</h3>\n    <p>To activate your account use this code ").concat(code, " \n    \n    ");
            mailOptions = {
                from: '"Squazzle Team" <info@creditalert.com.ng>',
                to: "".concat(emails),
                subject: "".concat(subject),
                text: "Hello ".concat(firstName),
                html: output
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('preview URL: %s', nodemailer_1["default"].getTestMessageUrl(info));
            });
            return [2 /*return*/];
        });
    });
}
exports.main = main;
;
var welcomeSender = function (user) {
    var output = "\n    <p>Welcome to Squazzle ".concat(user.firstName + " " + user.lastName, "</p>\n    <h3>Message</h3>\n    <p>Welcome to Squazzle , your account have been activated\n    ");
    var mailOptions = {
        from: '"Squazzle Team" <info@creditalert.com.ng>',
        to: "".concat(user.emails),
        subject: "Welcome to Squazzle",
        text: "Hello ".concat(user.firstName),
        html: output
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('preview URL: %s', nodemailer_1["default"].getTestMessageUrl(info));
    });
};
exports.welcomeSender = welcomeSender;
