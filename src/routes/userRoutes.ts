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
    },
    {
        "success": true,
        "message": "Account successfully created, Check your mail for activation code"
    },
    {
        "success": false,
        "email": "Email is already taken",
        "message": "Registration failure"
    },
    {
        "user": {
          "email": "lopoxo2629@kaimdr.com",
          "role": "user",
          "name": "samuel omolaja"
        },
        "expiresIn": 1800,
        "message": "Login success",
        "success": true
    },
    {
        "email": "please enter a valid email",
        "message": "Action unsuccessful",
        "success": false
    },
    {
        "password": "Password must be between 6 and 16 characters",
        "message": "Action unsuccessful",
        "success": false
    },
    {
        "message": "Failed login attempt",
        "email": "Incorrect password",
        "success": false
    },
    {
        "message": "Email already verified",
        "success": false
    },
    {
        "message": "Email verification success",
        "success": true
    },
    {
        "message": "Invalid code",
        "success": false
    },
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
    
const createUser = {
    tags: ["User"],
    description: "Create a user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Email of the user",
                            example: "namacab552@mahazai.com"
                        },
                        firstName: {
                            type: "string",
                            description: "first name of the user, minimum lenght: 1, max. lenght: 20",
                            example: "Samuel"
                        },
                        lastName: {
                            type: "string",
                            description: "Last name or surname of the user,minimum lenght: 1, max. lenght: 20",
                            example: "Omolaja"
                        },
                        phoneNumber: {
                            type: "string",
                            description: "mobile phone number of the user, must be 11digit ",
                            example: "08161228976"
                        },
                        password: {
                            type: "string",
                            description: "A unique password of the user with a combination of capital letter, small letter, numbers and signs, minimum lenght: 6, max. lenght: 16",
                            example: "Gxo@k.123ftz-f"
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[1],
                    }
                }
            }
        },
        // 409: {
        //     description: "Conflict",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 example: userList[5]  
        //             }
        //         }
        //     }          
        // },
        // 403: {
        //     description: "Conflict",
        //     content: {
        //         "application/json": {
        //             schema: {
        //                 type: "object",
        //                 example: userList[6]
        //             }
        //         }
        //     }           
        // },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[2]
                    }
                }
            }
        }
    }
};

const signInUser = {
    tags: ["User"],
    description: "sign in a user, on successful signin you will get a token in your browser cookies",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Email of the user",
                            example: "samlaja1292@gmail.com"
                        },
                        password: {
                            type: "string",
                            description: "A unique password of the user with a combination of capital letter, small letter, numbers and signs",
                            example: "Password123@."
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[3],
                    }
                }
            }
        },
        422: {
            description: "Unprocessable Entity",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[4],
                        //: userList[5]
                    }
                    
                }
              
            }
        },
        403: {
            description: "Forbidden",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[6]
                    }
                }
            }
        }
    }
};

const verifyCode = {
    tags: ["User"],
    description: "sign in a user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        code: {
                            type: "string",
                            description: "6 digit code sent to mail after registration",
                            example: "566192"
                        }
                        
                    }
                }
            }
        }
    },
    responses: {
        201: {
            description: "Created",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[8],
                    }
                }
            }
        },
        409: {
            description: "Conflict",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[7],
                    }
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: userList[9],
                    }
                }
            }
        },
    }
}
const userRouteDoc = {
    "/api/geAllUsers": {
        get:listUsers
    },
    "/api/signUp": {
        post:createUser
    },
    "/api/signIn": {
        post:signInUser
    },
    "/api/activateAccount": {
        post:verifyCode
    }

}
export {user_routes, serverRouteDoc,userRouteDoc}