import express, { Request, Response, NextFunction } from "express";
import {body ,validationResult} from 'express-validator'

const validateRequestResult = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    next()
}

export{validateRequestResult}