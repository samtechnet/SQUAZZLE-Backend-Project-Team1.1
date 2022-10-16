"use strict";
exports.__esModule = true;
exports.user_routes = void 0;
var user_1 = require("../controller/user");
var validation_1 = require("../controller/auth/validation");
var user_routes = function (app) {
    app.post("/api/signUp", (0, validation_1.signUpValidationRules)(), validation_1.validate, user_1.signUp);
    app.post("/api/signIn", (0, validation_1.validationRules)(), validation_1.validate, user_1.signIn);
    app.post("/api/activateAccount", user_1.activateAccount);
    app.get('/test', user_1.test);
};
exports.user_routes = user_routes;
