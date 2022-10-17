import nodemailer from "nodemailer";
import Email from "email-templates";
import dotenv from "dotenv";
import crypto from "node:crypto";
//import smtpTransport from "../lib/smtp-transport"
dotenv.config();

const {
    GMAIL_HOST,
    GMAIL_PORT,
GMAIL_USESSL,
GMAIL_USERNAME,
GMAIL_PASSWORD,
FROM
} = process.env
const date = new Date()
function newDate() {
    let currentdate = new Date();
    let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
    return datetime
}
let transporter = nodemailer.createTransport({
    host: GMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: GMAIL_USERNAME, // generated ethereal user
      pass: GMAIL_PASSWORD, // generated ethereal password
    },
    tls:{rejectUnauthorized:false}
  });

async function main(emails:string, firstName:string, lastName:string, code: any, subject:string) {
    //const code = crypto.randomInt(100000, 1000000);
    
   

    const output = `
    <p>Welcome to Squazzle ${firstName +" "+ lastName}</p>
    <h3>Message</h3>
    <p>To activate your account use this code ${code} 
    
    `;
    let mailOptions = {
        from: '"Squazzle Team" <info@creditalert.com.ng>',
        to: `${emails}`,
        subject: `${subject}`,
        text: `Hello ${firstName}`,
        html: output
      }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('preview URL: %s', nodemailer.getTestMessageUrl(info))
    });
    // const email = new Email({
    //     views: {
    //         root: "email-templates",
    //         options: { extension: "ejs" },
    //     },
    //     message: {
    //         from: process.env.FROM
    //     },
    //     send: true,
    //     transport: transporter
    // });
    
};


const welcomeSender = (user: any) => {
    const output = `
    <p>Welcome to Squazzle ${user.firstName + " " + user.lastName}</p>
    <h3>Message</h3>
    <p>Welcome to Squazzle , your account have been activated
    `;
    console.log(user.email)
    let mailOptions = {
        from: '"Squazzle Team" <info@creditalert.com.ng>',
        to: `${user.email}`,
        subject: "Welcome to Squazzle",
        text: `Hello ${user.firstName}`,
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('preview URL: %s', nodemailer.getTestMessageUrl(info))
    });
};

const loginWelcomeSender = (user: any) => { 
    const output = `
    <p>Welcome to Squazzle ${user.firstName +" "+ user.lastName}</p>
    <h3>Message</h3>
    <p>Welcome to Squazzle, we notice you just login your account at time: ${newDate()}</p> 
    <p>if you didn't initiate this login , pls change your password now. someone may be trying to gain access to your account</p>
    `;
//console.log(user.email)
    let mailOptions = {
        from: '"Squazzle Team" <info@creditalert.com.ng>',
        to: `${user.email}`,
        subject: "Login Notification",
        text: `Hello ${user.firstName}, Login Notice`,
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('preview URL: %s', nodemailer.getTestMessageUrl(info))
    });
}

//require('crypto').randomBytes(64).toString('hex')
export {main, welcomeSender, loginWelcomeSender};