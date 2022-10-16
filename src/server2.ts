import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";


const PORT = process.env.PORT2 || 5000;
const app: express.Application = express();
dotenv.config();
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
  
export { generateAccessToken }

app.listen(PORT, async () => { 
    console.log(`Server 2 running on port : ${PORT}`)
})