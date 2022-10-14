import express from "express";
import { signUp, signIn, test } from "../controller/user";
import {validateRequestResult} from "../middleware/validateRequest"

const user_routes = (app: express.Application) => {
    app.post("/api/signUp", validateRequestResult, signUp)
    app.post("/api/signIn", signIn)
    app.get('/test', test)
};

export {user_routes}