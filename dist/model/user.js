"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
//import { string } from "../services/errorHandlers/catchAsync";
var UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String,
        "default": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    role: {
        type: String,
        "default": "user",
        "enum": ["user", "admin"]
    },
    password: {
        type: String,
        required: true
    },
    awsId: {
        type: String
    },
    verificationCode: {
        type: Number
    },
    isEmailVerified: {
        type: Boolean,
        defualt: false,
        required: true
    },
    passwordResetCode: {
        type: String
    },
    registrationDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("User", UserSchema);
