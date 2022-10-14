import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../model/user";
import express, { NextFunction, Request, Response } from "express";
import { client } from "../services/database/database";
import { body, validationResult } from 'express-validator';
import { registerValidation, validateEmail } from "./auth/validation";
import crypto from "crypto";
import dotenv from "dotenv";
import main from "../mailers/senders";
import AppError from "../services/errorHandlers/errors";

dotenv.config();
const database = client.db("squazzledb");
const Users = database.collection("user");


const SecretKey: string = String(process.env.SecretKey);
function generateHash(email: string): string{
    let hashKey = crypto.createHmac("SHA256", SecretKey)
        .update(email).digest('base64').toString()
    return hashKey;
}
const signUp = async (req: Request, res: Response) => {
    const { email, firstName, lastName, phoneNumber, role, password } = req.body
    let subject = "Squazzle Registration"
    let isEmailVerified
    try {
        console.log(req.body)
        await client.connect();
        registerValidation;
        console.log('i reach here')
        const userTaken = await validateEmail(email);
        console.log('i reach here too')
        console.log(userTaken)
        if (userTaken) {
            return res.status(400).json({
                success: false,
                email: "Email is already taken",
                message: "Registration failure"
                
              });
        };

        const hashedPassword = generateHash(password);
        console.log(hashedPassword);
        const code = crypto.randomInt(100000, 1000000);
        console.log(code)
        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            password: hashedPassword,
            verificationCode: code,
            role,
            email,
            isEmailVerified: false,
            registrationDate: Date.now()
        });
        const reg = await Users.insertOne(newUser);
        console.log('i reach here also')
        console.log(reg);
        if (!reg) {
            return res.status(400).json({
                success: false,
                message: reg
            })
        }
        if (reg) {
            main(newUser.email, newUser.firstName, newUser.lastName, newUser.verificationCode, subject).catch(console.error)
            return res.status(200).json({
                success: true,
                message: "Account successfully created, Check your mail for activation code",
            });
            
        }
        //main(newUser.email, newUser.firstName, newUser.lastName, newUser.verificationCode).catch(console.error)
       
            
    } catch (error) {
        return res.send(new AppError(`something went wrong here is the error ${error}`, 500));
    } finally {
        await client.close();
    };
    
}
const signIn = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        console.log(req)
         res.status(200).json({
            success: true,
            message: "Account successfully created, Check your mail for activation code",
        });
    } catch (error) {
        return next(new AppError(`something went wrong here is the error ${error}`, 500));
    } finally {
        await client.close();
    };
};

const test = async (req: Request, res: Response) => {
    res.send("ök")
};

export { signUp,signIn, test };