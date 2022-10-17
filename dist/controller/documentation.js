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
exports.__esModule = true;
var userRoutes_1 = require("../routes/userRoutes");
var swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Squazzle App",
        version: "1.0.0",
        description: "Stutern Housemanship SQUAZZLE Project A squatting platform This platform allows people to accommodate others for an agreed period of time..This will provide api endpoint to the corresponding frontend app"
    },
    servers: [
        {
            url: "http://localhost:442",
            description: "Local Dev"
        },
        {
            url: "https://gallery-one-app.herokuapp.com/",
            description: "Production Dev"
        },
    ],
    tags: [
        {
            name: "Server",
            description: "Server routes"
        },
        {
            name: "User",
            description: "User routes"
        },
    ],
    paths: __assign(__assign({}, userRoutes_1.serverRouteDoc), userRoutes_1.userRouteDoc)
};
exports["default"] = swaggerDocumentation;
