"use strict";
exports.__esModule = true;
exports.user_routes = void 0;
var user_1 = require("../controller/user");
var validateRequest_1 = require("../middleware/validateRequest");
var user_routes = function (app) {
    app.post("/api/signUp", validateRequest_1.validateRequestResult, user_1.signUp);
    app.post("/api/signIn", user_1.signIn);
    app.post("/api/activateAccount", user_1.activateAccount);
    app.get('/test', user_1.test);
};
exports.user_routes = user_routes;
