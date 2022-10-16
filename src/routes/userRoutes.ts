import express from "express";
import { signUp, signIn,activateAccount, test } from "../controller/user";
import { validateRequestResult } from "../middleware/validateRequest";
import {validationRules, validate, signUpValidationRules} from "../controller/auth/validation"

const user_routes = (app: express.Application) => {
    app.post("/api/signUp", signUpValidationRules(),validate, signUp)
    app.post("/api/signIn", validationRules(), validate,signIn);
    app.post("/api/activateAccount", activateAccount);
    app.get('/test', test)
};

export {user_routes}