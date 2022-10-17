import { NextFunction, Request, Response } from 'express';
import AppError from "../../services/errorHandlers/errors";
import { client } from "../../services/database/database";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const authentication = req.headers
        console.log(authentication)

        const cookie = req.cookies
        console.log(cookie)
        next()
    } catch (error) {
        return next(new AppError(`something went wrong here is the error ${error}`, 500));
    } finally {
        await client.close();
    };
}

export {verifyToken}