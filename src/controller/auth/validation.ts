import { body,check, validationResult } from 'express-validator';
import User from "../../model/user";
import { client } from "../../services/database/database";
import Jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";

const database = client.db("squazzledb");
const Users = database.collection("user");


const validationRules = () => {
    return [
        check("email")
            .trim().isEmail().normalizeEmail().withMessage('please enter a valid email'),
            // check("name")
            // .trim()
            // .notEmpty().withMessage('name can not be empty')
            // .isLength({ min: 1, max: 20})
            // .withMessage
            // ("Name  must be between 1 and 20 characters"),
            check("password")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage
            ("Password must be between 6 and 16 characters")
            
    ]
};
const signUpValidationRules = () => {
    return [
        check("email")
            .trim().isEmail().normalizeEmail().withMessage('please enter a valid email'),
            check("firstName")
            .trim()
            .notEmpty().withMessage('first name can not be empty')
            .isLength({ min: 1, max: 20})
            .withMessage
            ("First name  must be between 1 and 20 characters"),
            
            check("lastName")
            .trim()
            .notEmpty().withMessage('last name can not be empty')
            .isLength({ min: 1, max: 20})
            .withMessage
            ("Last name  must be between 1 and 20 characters"),

            check("password")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage
            ("Password must be between 6 and 16 characters"),
        check("phoneNumber")
            .trim()
            .notEmpty().withMessage('Phone number can not be empty')
            .isLength({min:11, max:11})
            .withMessage("Phone number must be 11 digit long")
    ]
};

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    };

    const resultErrors = [];
    errors.array().map((err) => resultErrors.push({ [err.param]: err.msg }));

    resultErrors.push({ message: "Action unsuccessful" });
    resultErrors.push({ success: false });

    const errorObject = Object.assign({}, ...resultErrors)
    return res.status(422).json(errorObject);
};
const schema = [
    body('email').isEmail().withMessage('email must contain a valid email addres'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];
const loginschema = [
    body('email').isEmail().withMessage('email must contain a valid email addres'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];
const isCodeactive = [
   
    body('code').isLength({min:6}).isNumeric().withMessage('code must be at least 6 character long')
];
const validateEmail = async (email: String) => {
    try {
       await client.connect()
    let user = await Users.findOne({ email });
    console.log(user)
    if (user) {
      return true;
    } else {
      return false;
    }
   } catch (error) {
    
   }
};

const validatePhonenumber = async (phoneNumber: String) => {
    try {
       await client.connect()
    let user = await Users.findOne({ phoneNumber });
    console.log(user)
    if (user) {
      return true;
    } else {
      return false;
    }
   } catch (error) {
    
   }
};
const isActive = async (email: String) => {
      try {
        await client.connect()
          let user = await Users.findOne({ email });
          console.log(user.isEmailVerified + "  from isActive")
          if (user.isEmailVerified === "false") {
              return false;
           
          } else {
              
              return true
          
          }
          
      } catch (error) {
        
      }
}
  
const jwsToken = String(process.env.AccessToken);


function generateAccessToken(user: any) {
    let data={
        user_id: user._id,
        role: user.role,
        email: user.email,
        name: user?.firstName +" "+ user?.lastName,
      }
    return Jwt.sign(data, jwsToken, { expiresIn: '1800s' });
}
export { schema as registerValidation, loginschema, isCodeactive,validateEmail, isActive, generateAccessToken, validationRules, validate, signUpValidationRules, validatePhonenumber}