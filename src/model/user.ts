import { Schema, model } from "mongoose";
//import { string } from "../services/errorHandlers/catchAsync";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        
        image: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
        awsId: {
            type: String
            
        },
        verificationCode: {
            type: Number,
        },
        isEmailVerified: {
            type: Boolean,
            defualt: false,
            required: true
        },
        passwordResetCode: {
            type: String,
        }, 
        registrationDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

export default model("User", UserSchema);