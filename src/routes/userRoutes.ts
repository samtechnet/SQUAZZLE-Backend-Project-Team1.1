import express from "express";
import { signUp, signIn,activateAccount, test, geAllUsers } from "../controller/user";
import { validateRequestResult } from "../middleware/validateRequest";
import { validationRules, validate, signUpValidationRules } from "../controller/auth/validation";
import { verifyToken } from "../controller/auth/verifyAuth";

const user_routes = (app: express.Application) => {
    app.post("/api/signUp", signUpValidationRules(),validate, signUp)
    app.post("/api/signIn", validationRules(), validate,signIn);
    app.post("/api/activateAccount", activateAccount);
    app.get("/api/geAllUsers", geAllUsers)
    app.get('/test', test)
};

const server = {
    
    tags: ["Server"],
    description: "Test and get a response from server",
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                       
                    }
                }
            }
        }
    }
};


const serverRouteDoc = {
    "/squazzle": {
        get: server
    }
};

const userList = [
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

const listUsers = 
    {
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
    }
const userRouteDoc = {
    "/api/geAllUsers": {
        get:listUsers
    },
}
export {user_routes, serverRouteDoc,userRouteDoc}