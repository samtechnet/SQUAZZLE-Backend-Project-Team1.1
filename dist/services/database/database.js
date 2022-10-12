"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.uri = exports.client = void 0;
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _b = process.env, ENV = _b.ENV, password = _b.password, name = _b.name;
var uri = "mongodb+srv://".concat(name, ":").concat(password, "@gallery-one-app.h2qyv.mongodb.net/?retryWrites=true&w=majority");
exports.uri = uri;
var connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
var client = new MongoClient(uri, { useNewUrlParser: true, connectTimeoutMS: 90000, keepAlive: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
exports.client = client;
if (ENV === 'dev') {
    console.log('I am in dev mode');
}
if (ENV === 'prod') {
    console.log('I am in production mode');
}
