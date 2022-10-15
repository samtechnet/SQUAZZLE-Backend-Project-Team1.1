import { body, validationResult } from 'express-validator';
import User from "../../model/user";
import { client } from "../../services/database/database";

const database = client.db("squazzledb");
const Users = database.collection("user");

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
const isActive = async (email: String) => {
      try {
        await client.connect()
          let user = await Users.findOne({ email });
          console.log(user.isEmailVerified)
          if (user.isEmailVerified == "false") {
              return false;
          } else {
              return true;
          }
      } catch (error) {
        
      }
  }
export { schema as registerValidation, loginschema, isCodeactive,validateEmail, isActive}