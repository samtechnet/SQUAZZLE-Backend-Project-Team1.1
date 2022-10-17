"use strict";
exports.__esModule = true;
exports.userRouteDoc = exports.serverRouteDoc = exports.user_routes = void 0;
var user_1 = require("../controller/user");
var validation_1 = require("../controller/auth/validation");
var user_routes = function (app) {
    app.post("/api/signUp", (0, validation_1.signUpValidationRules)(), validation_1.validate, user_1.signUp);
    app.post("/api/signIn", (0, validation_1.validationRules)(), validation_1.validate, user_1.signIn);
    app.post("/api/activateAccount", user_1.activateAccount);
    app.get("/api/geAllUsers", user_1.geAllUsers);
    app.get('/test', user_1.test);
};
exports.user_routes = user_routes;
var server = {
    tags: ["Server"],
    description: "Test and get a response from server",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object"
                    }
                }
            }
        }
    }
};
var serverRouteDoc = {
    "/squazzle": {
        get: server
    }
};
exports.serverRouteDoc = serverRouteDoc;
var userList = [
    {
        "success": true,
        "data": [
            {
                "_id": "63496a06326a2198687ee20d",
                "firstName": "samuel",
                "lastName": "omolaja",
                "email": "lopoxo2629@kaimdr.com",
                "phoneNumber": "08161228946",
                "image": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                "role": "user",
                "password": "bluyq8jxLtZcb9M0cDKIOkrM90o04CkM4U+aXf6wn4Q=",
                "verificationCode": 566192,
                "isEmailVerified": true,
                "registrationDate": "2022-10-14T13:54:14.055Z"
            },
            {
                "_id": "634b302e731b34b7aa5e0cb8",
                "firstName": "daniel",
                "lastName": "omolaja",
                "email": "by3n7k32hg@paperpapyrus.com",
                "phoneNumber": "08161228946",
                "image": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                "role": "user",
                "password": "bluyq8jxLtZcb9M0cDKIOkrM90o04CkM4U+aXf6wn4Q=",
                "verificationCode": 846544,
                "isEmailVerified": false,
                "registrationDate": "2022-10-15T22:11:58.629Z"
            }
        ]
    }
];
var listUsers = {
    tags: ["User"],
    description: "List all of the users",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[0]
                    }
                }
            }
        }
    }
};
var userRouteDoc = {
    "/api/geAllUsers": {
        get: listUsers
    }
};
exports.userRouteDoc = userRouteDoc;
